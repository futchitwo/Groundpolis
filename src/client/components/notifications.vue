<template>
<div class="mfcuwfyp">
	<XList class="notifications" :items="items" v-slot="{ item: notification }">
		<XNote v-if="['reply', 'quote', 'mention'].includes(notification.type)" :note="notification.note" @update:note="noteUpdated(notification.note, $event)" :key="notification.id"/>
		<XNotification v-else :notification="notification" :with-time="true" :full="true" class="_panel notification" :key="notification.id"/>
	</XList>

	<button class="_loadMore" v-appear="$store.state.enableInfiniteScroll ? fetchMore : null" @click="fetchMore" v-show="more" :disabled="moreFetching" :style="{ cursor: moreFetching ? 'wait' : 'pointer' }">
		<template v-if="!moreFetching">{{ $ts.loadMore }}</template>
		<template v-if="moreFetching"><MkLoading inline/></template>
	</button>

	<p class="empty _emptyinfo" v-if="empty">{{ $ts.noNotifications }}</p>

	<MkError v-if="error" @retry="init()"/>
</div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import paging from '@/scripts/paging';
import XNotification from './notification.vue';
import XList from './date-separated-list.vue';
import XNote from './note.vue';
import { notificationTypes } from '../../types';
import * as os from '@/os';

export default defineComponent({
	components: {
		XNotification,
		XList,
		XNote,
	},

	mixins: [
		paging({}),
	],

	props: {
		includeTypes: {
			type: Array as PropType<typeof notificationTypes[number][]>,
			required: false,
			default: null,
		},
	},

	data() {
		return {
			connection: null,
			pagination: {
				endpoint: 'i/notifications',
				limit: 10,
				params: () => ({
					includeTypes: this.allIncludeTypes || undefined,
				})
			},
		};
	},

	computed: {
		allIncludeTypes() {
			return this.includeTypes ?? notificationTypes.filter(x => !this.$i.mutingNotificationTypes.includes(x));
		}
	},

	watch: {
		includeTypes: {
			handler() {
				this.reload();
			},
			deep: true
		},
		// TODO: vue/vuexのバグか仕様かは不明なものの、プロフィール更新するなどして $i が更新されると、
		// mutingNotificationTypes に変化が無くてもこのハンドラーが呼び出され無駄なリロードが発生するのを直す
		'$i.mutingNotificationTypes': {
			handler() {
				if (this.includeTypes === null) {
					this.reload();
				}
			},
			deep: true
		}
	},

	mounted() {
		this.connection = os.stream.useSharedConnection('main');
		this.connection.on('notification', this.onNotification);
	},

	beforeUnmount() {
		this.connection.dispose();
	},

	methods: {
		onNotification(notification) {
			const isMuted = !this.allIncludeTypes.includes(notification.type);
			if (isMuted || document.visibilityState === 'visible') {
				os.stream.send('readNotification', {
					id: notification.id
				});
			}

			if (!isMuted) {
				this.prepend({
					...notification,
					isRead: document.visibilityState === 'visible'
				});
			}
		},

		noteUpdated(oldValue, newValue) {
			const i = this.items.findIndex(n => n.note === oldValue);
			this.items[i] = {
				...this.items[i],
				note: newValue
			};
		},
	}
});
</script>

<style lang="scss" scoped>
.mfcuwfyp {
	> .empty {
		margin: 0;
		padding: 16px;
		text-align: center;
		color: var(--fg);
	}

	> .placeholder {
		padding: 32px;
		opacity: 0.3;
	}
}
</style>
