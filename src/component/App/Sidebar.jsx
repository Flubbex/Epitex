const sidebarSet = [
    { route: 'main', label: 'Main' },
    { route: 'world', label: 'World' },
    { route: 'notepad', label: 'Notepad' },
    { route: 'settings', label: 'Settings' },
    { route: 'music', label: 'Music' },
]

export const Sidebar = ({ route, setRoute }) => (
    <div className="col d-none d-lg-block" id="sidebar">
        <div className="btn-group d-flex">
            {sidebarSet.map((btn) => (
                <button
                    className={
                        'btn rounded-0 w-100 ' +
                        (route === btn.route ? 'btn-dark' : 'btn-secondary')
                    }
                    key={btn.route}
                    aria-pressed="true"
                    onClick={() => setRoute(btn.route)}
                >
                    {btn.label}
                </button>
            ))}
        </div>
    </div>
)

export default Sidebar
