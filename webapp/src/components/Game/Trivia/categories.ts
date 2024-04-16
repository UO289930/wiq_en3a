let numberCategoryMap = new Map<number, string>();

numberCategoryMap.set(1, "Sports");
numberCategoryMap.set(2, "Science");
numberCategoryMap.set(3, "History");
numberCategoryMap.set(4, "Geography");
numberCategoryMap.set(5, "Entertainment");
numberCategoryMap.set(6, "Free Choice");


let categoryColorMap = new Map<string, string>();

categoryColorMap.set("Sports", "#1f71b3");
categoryColorMap.set("Science", "#61a33a");
categoryColorMap.set("History", "#ffcc00");
categoryColorMap.set("Geography", "#ec811c");
categoryColorMap.set("Entertainment", "#db3d78");


export const getCategoryWithNumber = (number: number) : string => {
    return numberCategoryMap.get(number)!;
}

export const getCategoryColor = (category: string) : string => {
    return categoryColorMap.get(category)!;
}

export const getCategoryColorWithNumber = (number: number) : string => {
    return categoryColorMap.get(getCategoryWithNumber(number))!;
}

