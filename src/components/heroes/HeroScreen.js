import React, { useMemo } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import { heroImages } from '../../helpers/heroImages';
import { getHeroesById } from '../../selectors/getHeroById';



export const HeroScreen = ({history}) => {

     const {heroeId} = useParams();

    const hero = useMemo (() => getHeroesById(heroeId), [heroeId]);

    const handleReturn = () => {
        if (history.length <= 2) {

            history.push('/');

        } else {

        history.goBack();
    }
    }

    if (!hero) {
        return <Redirect to='/'/>;
    }

    const { 
        superhero,
        publisher,
        alter_ego,
        first_appearance,
        characters
    } = hero;

    return (
        <div className="row mt-5">
            <div className="col-4">
                <img src={ heroImages(`./${ heroeId }.jpg`).default }
                className="img-thumbnail animate__animated animate__fadeIn"
                alt={superhero}/>
            </div>
        <div className="col-8">
            <h3>{superhero}</h3>
            <ul className="list-group list-group-flush">
                <li className="list-group-item"><b>Alter ego: {alter_ego}</b></li>
                <li className="list-group-item"><b>Publisher: {publisher}</b></li>
                <li className="list-group-item"><b>First Appearance: {first_appearance}</b></li>
            </ul>
            
            <h5>Characters</h5>

            <p>{characters}</p>

            <button 
            className="btn btn-primary"
            onClick={handleReturn}>
                Return
            </button>

            </div>

        </div>
    )
}
