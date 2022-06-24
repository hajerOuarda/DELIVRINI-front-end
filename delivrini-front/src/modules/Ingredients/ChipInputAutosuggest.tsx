import { Autocomplete, Chip, TextField } from "@mui/material";
 
export interface IngredientsProps{
    ingredients: string []  
}
export default function ChipInputAutosuggest(props: any) {
    console.log("ingredientsProps",props.ingredients);

    return (
        <Autocomplete
            multiple
            id="tags-filled"
            options={[]}
            defaultValue={[]}
            freeSolo
            renderTags={(
                value: any[],
                getTagProps: (arg0: { index: any }) => JSX.IntrinsicAttributes
            ) =>
                value.map((option: any, index: number) => {
                    props.addIngredients(value);
                    return (
                        <Chip
                            key={index}
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                        />
                    );
                })
            }
            renderInput={(params: any) => (
                <TextField
                    {...params}
                    label="Ingredients"
                    placeholder="Add a ingredients by pressing enter after typing its name"

                />

            )}


        />
    );
}
