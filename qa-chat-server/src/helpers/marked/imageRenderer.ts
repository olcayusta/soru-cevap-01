import marked from 'marked'

export let imageRenderer = () => {
    const renderer = new marked.Renderer()

    const originalRendererImage = renderer.image.bind(renderer)

    renderer.image = ((href, title, text) => {
        title = 'YOUTUBE IS AWESOME!'
        return originalRendererImage(href, title, text)
    });

    return renderer
}
