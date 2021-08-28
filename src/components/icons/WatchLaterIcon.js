import { useState } from "react";
import { useCookies } from "react-cookie";
import { ADDTOWATCHLATER, REMOVEFROMWATCHLATER, getRequestOptions } from "../../resources/queries";
import Save from "../iconsSvg/Save";
import SelectedSave from "../iconsSvg/SelectedSave";
import { useMutation } from "@apollo/client";

const WatchLaterIcon = ({ movie }) => {

    const [isWatchLater, setisWatchLater] = useState(movie.isWatchLater);

    const [cookies] = useCookies(['TRACUE_AUTH']);

    const [addToWatchLaterMutation] = useMutation(ADDTOWATCHLATER, getRequestOptions(cookies));
    const [removeFromWatchLaterMutation] = useMutation(REMOVEFROMWATCHLATER, getRequestOptions(cookies));

    const addToWatchLaterHandler = () => {
        if (!isWatchLater) {
            setisWatchLater(true);
            addToWatchLaterMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                },
                (error) => {
                }
            );
        } else {
            setisWatchLater(false);
            removeFromWatchLaterMutation({
                variables: {
                    movieId: movie.id
                },
            }).then(
                (res) => {
                },
                (error) => {
                }
            );
        }
    }


    return (
        <>
            {isWatchLater &&
                <span onClick={addToWatchLaterHandler}>
                    <SelectedSave />
                </span>
            }

            {!isWatchLater &&
                <span onClick={addToWatchLaterHandler}>
                    <Save />
                </span>
            }
        </>
    );
}

export default WatchLaterIcon;