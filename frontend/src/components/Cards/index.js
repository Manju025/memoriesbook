import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "../Card";
import "./Cards.css";

const Cards = ({ refreshTrigger, filterYear, searchQuery }) => {
  const [memories, setMemories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMemories = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://memoriesbook-hsa1.onrender.com/memories");
      setMemories(data);
    } catch (err) {
      console.error("Error fetching memories:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMemories();
  }, [refreshTrigger]);

  if (loading) {
    return (
      <div className="cards-loading">
        <p>Loading memories...</p>
      </div>
    );
  }

  if (memories.length === 0) {
    return (
      <div className="cards-empty">
        <p>No memories yet. Add your first memory!</p>
      </div>
    );
  }

  const filteredMemories = memories.filter(memory => {
    const memoryYearMatch = filterYear === 'All' || 
      (memory.date && new Date(memory.date).getFullYear().toString() === filterYear);
      
    const searchMatch = !searchQuery || 
      memory.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
      memory.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.date?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      memory.creator?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (memory.tags && memory.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    return memoryYearMatch && searchMatch;
  });

  return (
    <div className="cards-container">
      {filteredMemories.length > 0 ? filteredMemories.map((memory) => (
        <Card
          key={memory._id}
          image={memory.image}
          title={memory.title}
          date={memory.date ? new Date(memory.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : ''}
          tags={memory.tags || []}
          description={memory.description}
          creator={memory.creator}
        />
      )) : (
        <div className="cards-empty">
          <p>No memories found for {filterYear}</p>
        </div>
      )}
    </div>
  );
};

export default Cards;
