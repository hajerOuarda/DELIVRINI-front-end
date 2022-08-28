import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


export default function ChipInputIngredients({ ingredients, setIngredients }: any) {

    const [currentTagText, setCurrentTagText] = useState("");


    const handleTag = (e: any, index: any) => {
        if (e.keyCode === 13 && e.target.value) {

            const { name, value } = e.target;
            const list = [...ingredients];
            list[name] = value;
            // setIngredients([...list,{name:""}]);

            setIngredients((ingredients: any[]) => [...ingredients, { name: e.target.value }]);
            console.log("defaultList", ingredients);
            setCurrentTagText("");
            e.preventDefault();
        }
    };

    const removeTag = (option: any) => {
        setIngredients((ingredients: any) => ingredients.filter((value: any) => (
            value.name !== option
        )))
    };

    return (
        <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={ingredients.map((i: any) => i.name)}
            freeSolo
            value={ingredients.map((i: any) => i.name)}
            renderTags={(
                value: string[],
                getTagProps
            ) =>
                value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })}
                        onDelete={() => removeTag(option)}
                        key={index} color="secondary"

                    />
                ))
            }
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    label="Ingredients"
                    placeholder="Add a ingredients by pressing enter after its dotName or address"
                    onKeyDown={handleTag}
                />
            )
            }
        />
    );


}
