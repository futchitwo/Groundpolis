import * as React from 'react';

export const Icon = (props: any) => (
	<svg width='1em' height='1em' viewBox='0 0 512 512' {...props}>
		<path fill='none' d='M0 0h512v512H0z' />
		<path d='M194.593 349.511l-24.978 94.691H143.79l65.851-249.64h223.815s25.825 0 19.012 25.825L425.22 323.686c-6.813 25.825-32.637 25.825-32.637 25.825zm229.78-120.516c2.271-8.608 2.271-8.608-6.338-8.608H228.654l-27.249 103.299h189.381s8.609 0 10.879-8.608z' />
		<path d='M80.452 283.005c-25.825 0-19.013-25.825-19.013-25.825l43.144-163.557c6.812-25.825 32.637-25.825 32.637-25.825h249.639l-6.812 25.825H139.016c-8.608 0-10.879 8.608-10.879 8.608-29.519 111.908-39.818 147.506-38.602 146.341 0 0-2.271 8.608 6.337 8.608H302.47c8.609 0 8.609 0 10.879-8.608l27.249-103.299h25.825l-29.52 111.907c-6.812 25.825-32.637 25.825-32.637 25.825z' />
	</svg>
);

export default React.memo(Icon);
