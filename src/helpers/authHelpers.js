export function userName(name, maxLength = 8) {
    if (name && name.length > maxLength) {
        return name.substring(0, maxLength) + "...";
    }
    return name;
}
