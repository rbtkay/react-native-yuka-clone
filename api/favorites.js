import { firebase } from "./firebaseConfig";

const favoriteRef = firebase.firestore().collection("favorites");
exports.findFavoriteProductsByUser = (user_id) => {
    return new Promise((resolve, reject) => {
        favoriteRef.where("user_id", "==", user_id).onSnapshot(
            (querySnapshot) => {
                const user_products = [];
                querySnapshot.forEach((doc) => {
                    user_products.push(doc.data());
                });

                getUserProductFromApi(user_products).then((result) => {
                    resolve(result);
                });
            },
            (error) => {
                reject(error);
            }
        );
    });
};

exports.addProductToFavorite = (user_id, barcode) => {
    return new Promise((resolve, reject) => {
        const data = {
            user_id,
            barcode: `${barcode}___${user_id}`,
        };
        favoriteRef
            .add(data)
            .then((_doc) => {
                resolve(true);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

exports.removeProductFromFavorites = (user_id, barcode) => {
    return new Promise((resolve, reject) => {
        const id = `${barcode}___${user_id}`;
        favoriteRef
            .where("barcode", "==", id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.docs.forEach((doc) => {
                    doc.ref.delete();
                });
            });
        // .doc(id)
        // .delete()
        // .then(() => {
        //     resolve(true);
        // })
        // .catch((error) => {
        //     reject(error);
        // });
    });
};

exports.findOneFavorite = (user_id, barcode) => {
    return new Promise((resolve, reject) => {
        favoriteRef
            .where("barcode", "==", `${barcode}___${user_id}`)
            .onSnapshot((querySnapshot) => {
                if (querySnapshot.docs[0]) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            });
    });
};

const getUserProductFromApi = (user_products) => {
    const promises = user_products.map(async (product) => {
        return await fetch(
            `https://world.openfoodfacts.org/api/v0/product/${
                product.barcode.split("___")[0]
            }.json`
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

    return Promise.all(promises);
};
