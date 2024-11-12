import { parse } from "date-fns";

export function parseDateString(dateString: string) {
    return parse(dateString, "dd/MM/yyyy", new Date());
}
