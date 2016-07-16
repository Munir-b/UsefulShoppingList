import {List, OrderedMap} from "immutable";


const dummyCategory = {
    id: "Dummy".toLowerCase(),
    name: "Dummy",
    items: OrderedMap({
        "some_item":{
            id: "Some item".toLowerCase(),
            name: "Some item",
            have:false
        },
        "other_item":{
            id: "Other item".toLowerCase(),
            name: "Other item",
            have:true
        }
    })
};

export const initialState = {
    categories: OrderedMap({"dummy":dummyCategory}),
    newCategoryName: "new category"
};