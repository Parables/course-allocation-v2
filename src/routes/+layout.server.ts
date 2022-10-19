import type { LayoutServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load: LayoutServerLoad = auth.handleServerSession();
