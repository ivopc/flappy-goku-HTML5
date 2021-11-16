class AssetLoader {
    static async fetch (assets) {
        await Promise.all([
            this.loadImages(assets.filter(asset => asset.type === "image")),
            this.loadAudios(assets.filter(asset => asset.type === "audio")),
            this.loadJson(assets.filter(asset => asset.type === "json"))
        ]);
    }

    static loadImages (images) {
        return images.map(({ url, key }) => 
                new Promise(resolve => {
                    const img = new Image();
                    img.src = url;
                    this.cache.img[key] = img;
                    img.addEventListener("load", resolve);
                })
            );
    }

    static loadAudios (audios) {
        return audios.map(({ url, key }) =>
                new Promise(resolve => {
                    const audio = new Audio();
                    audio.src = url;
                    this.cache.audio[key] = audio;
                    audio.addEventListener("canplaythrough", resolve);
                })
            );
    }

    static loadJson (jsons) {
        return Promise.all(jsons.map(async ({ url, key }) => {
            const response = await fetch(url);
            this.cache.json[key] = await response.json();
        }));
    }

    static cache = {
        img: {},
        audio: {},
        json: {}
    }
};

export default AssetLoader;