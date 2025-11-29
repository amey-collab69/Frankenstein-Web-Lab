import { useEffect } from 'react';
import { useFrankensteinStore } from '../../context/FrankensteinStore';
import { dashboardAPI } from '../../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { dashboardCards, setCards, removeCard } = useFrankensteinStore();

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const response = await dashboardAPI.getCards();
      setCards(response.data);
    } catch (error) {
      console.error('Failed to load cards:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await dashboardAPI.deleteCard(id);
      removeCard(id);
    } catch (error) {
      console.error('Failed to delete card:', error);
    }
  };

  const renderCardContent = (card) => {
    switch (card.type) {
      case 'text':
        return <pre className="card-text">{card.content}</pre>;
      case 'json':
        return <pre className="card-json">{JSON.stringify(card.content, null, 2)}</pre>;
      case 'pixel':
        return (
          <div className="card-pixel-grid">
            {card.content.pixels?.map((row, y) => (
              <div key={y} className="card-pixel-row">
                {row.map((color, x) => (
                  <div
                    key={`${x}-${y}`}
                    className="card-pixel"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            ))}
          </div>
        );
      default:
        return <p>{String(card.content)}</p>;
    }
  };

  return (
    <div className="dashboard-container">
      <h2 className="glow-text electric-arc">📊 CONTROL DASHBOARD</h2>
      
      <div className="dashboard-grid">
        {dashboardCards.length === 0 ? (
          <div className="empty-state lab-container neon-border">
            <p>No data yet. Create something in Terminal or Canvas!</p>
          </div>
        ) : (
          dashboardCards.map((card) => (
            <div key={card._id || card.timestamp} className="dashboard-card lab-container neon-border pulse">
              <div className="card-header">
                <h3>{card.title}</h3>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(card._id)}
                >
                  ✕
                </button>
              </div>
              <div className="card-content">
                {renderCardContent(card)}
              </div>
              <div className="card-footer">
                <span className="card-type">{card.type}</span>
                <span className="card-time">
                  {new Date(card.timestamp).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
