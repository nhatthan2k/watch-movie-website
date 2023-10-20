function Translate(value) {
    const withoutDiacritic = value.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

    const englishText = withoutDiacritic.replace(/đ/g, 'd').replace(/Đ/g, 'D');

    const urlPath = englishText.normalize('NFD').replace(/\s+/g, '-').toLowerCase();

    return urlPath;
}

export default Translate;
