const spacer = (name, len = 20) => ' '.repeat(len - name.length)

window.dbg = (source, ...v) => {
    console.log(source, spacer(source), ...v)
}

window.nuke = () => (localStorage['savedGame'] = null)
