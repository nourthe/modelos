import { definePanel } from '@directus/extensions-sdk';
import PanelComponent from './panel.vue';

export default definePanel({
	id: 'nourthe-modelos-mensaje-compilado',
	name: 'Mensaje compilado para el curso',
	icon: 'box',
	description: 'Mensaje listo para compartir con los alumnos.',
	component: PanelComponent,
	options: [
		{
			field: 'course',
			name: 'ID del curso',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'full',
			},
		},
		{
			field: 'week',
			name: 'ID de la semana',
			type: 'string',
			meta: {
				interface: 'input',
				width: 'full',
			},
		},
	],
	minWidth: 12,
	minHeight: 8,
});
