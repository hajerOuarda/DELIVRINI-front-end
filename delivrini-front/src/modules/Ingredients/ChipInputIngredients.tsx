import * as React from 'react';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

// export interface IngredientsProps {
//     ingredients: string[]
// }
export default function ChipInputIngredients({ ingredients, setIngredients }: any) {

    const [currentTagText, setCurrentTagText] = useState("");

    const handleTag = (e: any) => {
        if (e.keyCode === 13 && e.target.value) {
            setIngredients((ingredients: any[]) => [...ingredients, e.target.value]);
            setCurrentTagText("");
            e.preventDefault();
        }
    };

    const removeTag = (option: any) => {
        console.log("options tag", option);
        setIngredients((ingredients: any) => ingredients.filter((value: any) => (
            value !== option
            // console.log('i', i.name,"ingredients",ingredients)
        )))

    };


    return (
        <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={[]}
            freeSolo

            renderTags={(
                value: string[],
                getTagProps
            ) =>
                value.map((option: string, index: number) => (
                    <Chip variant="outlined" label={option} {...getTagProps({ index })} onDelete={() => removeTag(option)} key={index}
                    />
                ))
            }
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    label="Receivers"
                    placeholder="Add a receiver by pressing enter after its dotName or address"
                    onKeyDown={handleTag}
                />
            )
            }
        />
    );


}
