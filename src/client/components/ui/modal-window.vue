<template>
<MkModal ref="modal" @click="$emit('click')" @closed="$emit('closed')">
	<div class="ebkgoccj _popup _narrow_" @keydown="onKeydown" :style="{ width: `${width}px`, height: height ? `${height}px` : null }">
		<div class="header">
			<slot name="header"></slot>
		</div>
		<div class="body" v-if="padding">
			<div class="_section">
				<slot></slot>
			</div>
		</div>
		<div class="body" v-else>
			<slot></slot>
		</div>
		<div class="footer">
			<button class="_button" v-if="withOkButton" @click="$emit('close')"><Fa :icon="faTimes"/></button>
			<div class="content">
				<slot name="footer"></slot>
			</div>
			<button class="_button" v-if="!withOkButton" @click="$emit('close')"><Fa :icon="faTimes"/></button>
			<button class="_button" v-if="withOkButton" @click="$emit('ok')" :disabled="okButtonDisabled"><Fa :icon="faCheck"/></button>
		</div>
	</div>
</MkModal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import MkModal from './modal.vue';

export default defineComponent({
	components: {
		MkModal
	},
	props: {
		withOkButton: {
			type: Boolean,
			required: false,
			default: false
		},
		okButtonDisabled: {
			type: Boolean,
			required: false,
			default: false
		},
		padding: {
			type: Boolean,
			required: false,
			default: false
		},
		width: {
			type: Number,
			required: false,
			default: 400
		},
		height: {
			type: Number,
			required: false,
			default: null
		},
		canClose: {
			type: Boolean,
			required: false,
			default: true,
		},
	},

	emits: ['click', 'close', 'closed', 'ok'],

	data() {
		return {
			faTimes, faCheck
		};
	},

	methods: {
		close() {
			this.$refs.modal.close();
		},

		onKeydown(e) {
			if (e.which === 27) { // Esc
				e.preventDefault();
				e.stopPropagation();
				this.close();
			}
		},
	}
});
</script>

<style lang="scss" scoped>
.ebkgoccj {
	overflow: hidden;
	display: flex;
	flex-direction: column;
	contain: content;

	--section-padding: 24px;

	@media (max-width: 500px) {
		--section-padding: 16px;
	}
	$height: 58px;
	$height-narrow: 42px;

	> .header {
		display: flex;
		flex-shrink: 0;
		box-shadow: 0px 1px var(--divider);
		line-height: $height;
		align-items: center;
		justify-content: center;
		font-weight: bold;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		pointer-events: none;

		@media (max-width: 500px) {
			line-height: $height-narrow;
			padding-left: 16px;
		}
	}

	> .footer {
		display: flex;
		flex-shrink: 0;
		box-shadow: 0px -1px var(--divider);

		> button {
			height: $height;
			width: $height;
			font-size: $height / 3;

			@media (max-width: 500px) {
				height: $height-narrow;
				width: $height-narrow;
			}
		}

		> .content {
			flex: 1;
			line-height: $height;
			font-weight: bold;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;

			@media (max-width: 500px) {
				line-height: $height-narrow;
				padding-left: 16px;
			}
		}

		> button + .title {
			padding-left: 0;
		}
	}

	> .body {
		overflow: auto;
		height: 100%;
	}
}
</style>
