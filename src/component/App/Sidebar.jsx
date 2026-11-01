const sidebarSet = [
    { route: 'main', label: 'Main' },
    { route: 'editor', label: 'Editor' },
    { route: 'notepad', label: 'Notepad' },
    { route: 'settings', label: 'Settings' },
    { route: 'music', label: 'Music' },
]

export const Sidebar = ({ route, setRoute }) => (
    <div className="btn-group w-100">
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
)

export default Sidebar
