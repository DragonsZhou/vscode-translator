const App = () => {
    return (
        <div>
            <input type="text" name="name"></input>
            <button>hello</button>
        </div>
    );
};
const rootElement = document.getElementById('root');
if (rootElement) {
    const root = (ReactDOM as any).createRoot(rootElement);
    root.render(<App />);
} else {
    console.error('Root element not found!');
}