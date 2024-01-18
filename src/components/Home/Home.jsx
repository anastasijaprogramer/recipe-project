import React, { useRef, useState } from 'react';

const Home = () =>
{
    const inputRef = useRef(null);
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const apiKey = "6a2258b17f9e45f59bd7dc0732a1d90b";

    const handleSubmit = async (e) =>
    {
        e.preventDefault();

        if (!inputRef.current.value.trim()) {
            console.log('Please enter a value');
            return;
        }

        let excluded = inputRef.current.value;
        let api = `https://api.spoonacular.com/recipes/complexSearch?excludeIngredients=${excluded}&apiKey=${apiKey}`;
        
        setIsLoading(true);

        let response = await fetch(api);
        if (!response.ok) {
            console.log('Failed to fetch the data');
            return;
        }
    
        let fetchedData = await response.json();
        await setData(fetchedData.results);

        console.log(data)

        inputRef.current.value = "";
        setIsLoading(false);
    }

    return (
        <div>
            <form >
                <input type='text' ref={inputRef} />
                <button type='submit' onClick={handleSubmit}>Search</button>
                {isLoading && <p>Loading...</p>}
            </form>
 
             {data &&
                <ul>
                    {data.map((item) =>
                    (
                        <li key={item.id}>{item.title} item</li>
                    ))}
                </ul>}  

        </div>
    );
}

export default Home;
