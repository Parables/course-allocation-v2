import type { SvelteComponentDev } from 'svelte/internal';

export interface IColumn {
	id?: string;
	name: string;
	class?: string;
	fixed?: boolean;
}

export interface IRowSchema {
	id?: string;
	class?: string;
	cellSchema: ICellSchema[];
}

export type Action = 'view' | 'edit' | 'delete' | 'more';
/* {
	icon: string | SvelteComponentDev;
	url?: string | undefined;
	onClick?: (rowData: Record<string, any>) => void | undefined;
}; */
// export const defaultActions: Action[] = [{ icon: ViewIcon }, { icon: EditIcon }, { icon: DeleteIcon }, { icon: ViewIcon }];

export interface ICellSchema {
	class?: string;
	type?: 'text' | 'numeric' | 'chip' | 'avartar-text' | 'avartar-mainText-subText' | 'actions';
	avartar?: string; // data.key for the url of the image to be used as src or initial letter(s)
	text?: string; // data.key for the text to be displayed
	subText?: string; // data.key for the subText to be displayed below the text(mainText)
	actions?: Action[];
}

export interface ITable {
	id: string;
	columns: IColumn[];
	rowSchema: IRowSchema;
	class?: string;
	storeName?: any;
	validateSchema?: any;
}

export class Table {
	constructor(props: ITable) {
		Object.assign(this, props);
	}
}
