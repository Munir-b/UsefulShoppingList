import {List, OrderedMap} from "immutable";


const dummyCategory = {
    id: "Dummy".toLowerCase(),
    name: "Dummy",
    items: OrderedMap({
        "some_item":{
            id: "some_item",
            name: "Some item",
            have:false
        },
        "other_item":{
            id: "other_item",
            name: "Other item",
            have:true
        }
    })
};

export const initialState = {
    categories: OrderedMap({"dummy":dummyCategory}),
    newCategoryName: "new category"
};