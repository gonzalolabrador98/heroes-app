import React, { useMemo } from 'react'
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroByName } from '../../selectors/getHeroByName';

export const SearchScreen = React.memo(({ history }) => {

    const location = useLocation();
    const { q = '' } = queryString.parse(location.search);

    const [formValues, handleInputChange] = useForm({
        searchText: q
    });

    const { searchText } = formValues;

    //IMPORTANTE USE MEMO
    
    const heroesFiltered = useMemo(() =>getHeroByName(q), [q])

    const handleSearch = (e) => {
        e.preventDefault();
        history.push(`?q=${searchText}`);
    }

    return (
        <div>

            <h1> Search </h1>
            <hr />

            <div className="row">

                <div className=" col-5">
                    <h4>Search Form</h4>
                    <hr />

                    <form onSubmit={handleSearch}>

                        <input
                            className="form-control"
                            type="text"
                            placeholder="Find your hero"
                            name="searchText"
                            value={searchText}
                            onChange={handleInputChange}
                            autoComplete="off" />

                        <button
                            className="btn btn-primary mt-3"
                            type="submit">
                            Search
                        </button>

                    </form>

                </div>

                <div className="col-7">

                    <h4>Results</h4>
                    <hr />

                    {
                        (q==='') 
                        &&
                        <div className="alert alert-info">
                        Search Hero
                        </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length === 0) 
                        &&
                        <div className="alert alert-danger">
                        There is no a hero with "{q}"
                        </div>
                    }


                    {
                        heroesFiltered.map(hero => (
                            <HeroCard
                                key={hero.id}
                                {...hero}
                            />

                        ))
                    }



                </div>
            </div>
        </div>
    )
})
