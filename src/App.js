
import './App.css';
import Form from  './components/form'
function App() {
  return (
    <div className="App" style={{ 
    
      backgroundImage: `url(${process.env.PUBLIC_URL}/img.jpg)`,
    
    }}>
      {/* Arka plan üzerine karartma efekti */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Transparan siyah katman
        boxShadow: "inset 0px 0px 30px rgba(0, 0, 0, 0.7)"
      }}></div>

      {/* İçerik */}
      <div style={{
        position: "relative",
        background: "rgba(255, 255, 255, 0.8)", 
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)"
      }}>
        <Form />
      </div>
    </div>
  );
}

export default App;
