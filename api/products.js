import { firebase } from "./firebaseConfig";
import { RecyclerViewBackedScrollView } from "react-native";

const productsRef = firebase.firestore().collection("products");
exports.addProduct = (user_id, barcode) => {
    return new Promise((resolve, reject) => {
        console.log("adding product", user_id, barcode);
        const data = {
            user_id,
            barcode,
        };
        productsRef
            .add(data)
            .then((_doc) => {
                resolve(true);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.findProductsByUser = (user_id) => {
    return new Promise((resolve, reject) => {
        productsRef.where("user_id", "==", user_id).onSnapshot(
            (querySnapshot) => {
                const user_products = [];
                querySnapshot.forEach((doc) => {
                    user_products.push(doc.data());
                });

                getUserProductFromApi(user_products).then((result) => {
                    resolve(result);
                });
                // const user_product_from_api = getUserProductFromApi(
                //     user_products
                // );

                // getUserProductFromApi(user_products)

                // console.log(user_product_from_api);
            },
            (error) => {
                reject(error);
            }
        );
    });
};

exports.findOneProduct = (barcode) =>{
    return new Promise((resolve, reject)=>{
        productsRef.where("barcode", "==", barcode).onSnapshot(
            (querySnapshot)=>{
                if(querySnapshot.docs[0]){
                    resolve(true);
                }else{
                    resolve(false);
                }
            }
        )
    })
}

const getUserProductFromApi = (user_products) => {
    const promises = user_products.map(async (product) => {
        console.log("product", product);
        return await fetch(
            `https://world.openfoodfacts.org/api/v0/product/${product.barcode}.json`
        )
            .then((response) => {
                return response.json();
            })
            .then((responseJson) => {
                return responseJson.product;
            })
            .catch((error) => {
                console.error(error);
            });
    });

    console.log(promises.length);

    return Promise.all(promises);
};
