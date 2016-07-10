import {List} from "immutable";

export const initialState = {
    categories: List.of({
        id: "Dummy".toLowerCase(),
        name: "Dummy",
        items: List.of(
            {
                id: 1,
                name: "Some item",
                have:false
            },
            {
                id: 2,
                name: "Other item",
                have:true
            }
        )
    }),
    newCategoryName: "new category"
};