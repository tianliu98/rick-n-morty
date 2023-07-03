import React from "react";

interface CharacterData {
    id: number;
    name: string;
    image: string;
}

interface CharacterProp {
    character?: CharacterData;
}

const Character: React.FC<CharacterProp> = ({ character }) => {
    return (
        <div className="character-img-container">
            <img src={character?.image} alt={character?.name} />
            <h2>{character?.name}</h2>
        </div>
    );
};

export default Character;
