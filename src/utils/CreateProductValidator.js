const isEmpty = (val) => val === "" || val === null || val === undefined;
const isInvalidNumber = (val) => isEmpty(val) || isNaN(Number(val)) || Number(val) <= 0;

export const createProductValidator = (data, imageFile, isEdit = false) => {
    if (!data.model?.trim()) return "El modelo es obligatorio";
    if (!data.color?.trim()) return "El color es obligatorio";
    if (!data.grade?.trim()) return "El grado de calidad es obligatorio";
    if (isInvalidNumber(data.price)) return "El precio debe ser mayor a 0";
    if (!data.physicalState?.trim()) return "El estado fisico del dispositivo es obligatorio";
    if (isInvalidNumber(data.unitsAvailable)) return "Las unidades disponibles deben ser un numero mayor a 0";
    if (!isEdit && (!imageFile || !(imageFile instanceof File))) return "La imagen es obligatoria";
    return null;
}