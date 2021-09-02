class Pokemon {

    constructor(
        id,
        name,
        imageUrl,
        gen,
        type,
        category,
        weak) {
            this.id = id;
            this.name = name;
            this.imageUrl = imageUrl;
            this.gen = gen;
            this.type = type;
            this.category = category;
            this.weak = weak;
    }
}

module.exports = Pokemon;