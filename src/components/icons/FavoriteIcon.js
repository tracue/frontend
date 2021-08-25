import { useCookies } from "react-cookie";
import { useState } from "react";
import { ADDTOFAVORITES, REMOVEFROMFAVORITES, getRequestOptions } from "../../resources/queries";
import { useMutation } from "@apollo/client";
import SelectedHeart from "../iconsSvg/SelectedHeart";
import Heart from "../iconsSvg/Heart";


const FavoriteIcon = ({ movie }) => {
    const [cookies] = useCookies(['TRACUE_AUTH']);
    const [isFavorite, setIsFavorite] = useState(movie.isFavorite);
    const [addToFavoriteMutation] = useMutation(ADDTOFAVORITES, getRequestOptions(cookies));
    const [removeFromFavoriteMutation] = useMutation(REMOVEFROMFAVORITES, getRequestOptions(cookies));

    const addToFavoriteHandler = () => {
        if (!isFavorite) {
            setIsFavorite(true);
            addToFavoriteMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                    console.log(res);
                    console.log(isFavorite);
                },
                (error) => {
                }
            );
        } else {
            setIsFavorite(false);
            removeFromFavoriteMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                    console.log(res);
                    console.log(isFavorite);
                },
                (error) => {
                }
            );
        }
    }

    return (
        <>
            {isFavorite &&
                <span onClick={addToFavoriteHandler}>
                    <SelectedHeart />
                </span>}
            {
                !isFavorite &&
                <span onClick={addToFavoriteHandler}>
                    <Heart />
                </span>
            }
        </>
    );
}

export default FavoriteIcon;