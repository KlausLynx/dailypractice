import React from 'react';
import {ShoppingCart, Plus, Minus, Trash2, ChevronLeft, ChevronRight, CheckCircle} from 'lucide-react';
import laptopImg from '../../assets/laptop.jpg';
import mouseImg from '../../assets/mouse.jpg';
import wifiImg from '../../assets/Wifi-router.jpg';
import './learn.css';

// import { useState } from 'react';
export default function MainComponent () {
    const mainContStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 2fr)',
        gridTemplateRows: 'auto',
        backgroundColor: 'whiteSmoke',
        maxWidth: '1200px',
        width: '100%',
        margin: '2rem',
        padding: '2rem',
        gap: '2rem',
    }
    return(
        <div style={mainContStyle}>
            <div>
                <h1>Exercise 1: Product Cart</h1>
                <ProductCart />
            </div>
            <div>
                <h1>Exercise 2: Multi-Step Form</h1>
                <MultiStepForm />
            </div>
            <div>
                <h1>Exercise 3: Todo List with Priorities</h1>
                <TodoListWithPriorities />
            </div>
        </div>
    )
};

function ProductItem({name, src, price, value, onValueChange}) {
    const decrement = () => {
        if (value > 0) {
          onValueChange(value - 1);
        }
    }
    const buttonStyle = {
        width: '1.5rem',
        height: '1.5rem',
        border: 'none',
        backgroundColor: '#D3D3D3',
        opacity: 0.7,
        padding: '0.5rem',
        margin: '0',
        cursor: 'pointer',
    }

    return (
        <div style={
            {
                display: 'flex',
                border: '1px solid lightGray',
                borderRadius: '10px',
                margin: '1rem 0',
                justifyContent: 'space-between',
                alignItems: 'center',
            }
        }>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem'}}>
                <img src={src} alt={`image of ${name}`} width={75} />
                <div>
                    <p>{name}</p>
                    <small>${price}</small>
                </div>
            </div>
            <div style={{display: 'flex', justifyContent: 'end', alignItems: 'center', gap: '0.5rem', marginLeft: 'auto', paddingRight: '1rem'}}>
                <button style={{
                    ...buttonStyle,
                    borderTopLeftRadius: '5px',
                    borderBottomLeftRadius: '5px'
                }} onClick={decrement}>
                    <Minus size={10} />
                </button>
                <input className="no-spinner" style={{
                    textAlign: 'center', 
                    width: '40px',  // Small fixed width
                    height: '25px', 
                    color: 'black',
                    border: '1px solid #D3D3D3',
                    padding: '0',
                    fontSize: '14px',
                    // Remove number input arrows/spinners
                    MozAppearance: 'textfield',  // Firefox
                    WebkitAppearance: 'none', 
                    appearance: 'textfield'
                }}  type="number" name="" id="" min={0} value={value} onChange={(e) => onValueChange(Number(e.target.value) || 0)} />
                <button style={{
                    ...buttonStyle,
                    borderTopRightRadius: '5px',
                    borderBottomRightRadius: '5px'
                }} onClick={() => onValueChange(value + 1)}>
                    <Plus size={10} />
                </button>
            </div>
        </div>
    )
}

const ProductCart = () => {
    const [cartItem, setCartItem] = React.useState([
        {id: 1, name: 'Laptop', price: 1000, imgSrc: laptopImg, quantity: 0
        },
        {id: 2, name: 'Mouse', price: 700, imgSrc: mouseImg, quantity: 0
        },
        {id: 3, name: 'WiFi', price: 400, imgSrc: wifiImg, quantity: 0
        }
    ]);

    // const updateQuantity = (id, quantity) => {
    //     const validQuantity = Math.max(0, quantity); // Prevent negative numbers
    //     setCartItem(prevItems =>
    //         prevItems.map(item =>
    //             item.id === id ? {...item, quantity: validQuantity} : item
    //         )
    //     );
    // };

    // Calculate total products and total price
    const totalProducts = cartItem.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cartItem.reduce((total, item) => total + (item.price * item.quantity), 0);
    return (
        <div style={{border: '1px solid lightGray', borderRadius: '10px', padding: '1rem', backgroundColor: 'white'}}>
            <h1>Product Cart</h1>
                <div>
                    <div>
                        <ShoppingCart size={30} />
                        <h2>Shopping Cart</h2>
                    </div>
                    <div>
                        {cartItem.map(item => (
                            <ProductItem 
                                key={item.id} 
                                name={item.name} 
                                price={item.price} 
                                src={item.imgSrc}
                                value={item.quantity}
                                // onValueChange={(newQuantity) => updateQuantity(item.id, newQuantity)} />
                                onValueChange={(newQuantity) => {
                                const validQuantity = Math.max(0, newQuantity);
                                setCartItem(prevItems =>
                                    prevItems.map(i =>
                                        i.id === item.id ? {...i, quantity: validQuantity} : i
                                    )
                                );
                            }} />
                        ))}
                    </div>
                    <div>
                        <p>Total Products: <strong>{totalProducts}</strong> </p>
                        <p>Total Price: <strong>${totalPrice}</strong></p>
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        <button style={{backgroundColor: 'burlywood', padding: '.5rem 1rem', width: '50%', borderRadius: '5px'}}>Checkout</button>
                    </div>
            </div>
        </div>
    )
}

const MultiStepForm = () => {
  // All form data in one state object with nested structure
  const [formData, setFormData] = React.useState({
    step: 1,
    personal: {
      firstName: '',
      lastName: '',
      email: ''
    },
    address: {
      street: '',
      city: '',
      zipCode: ''
    },
    payment: {
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    }
  });

  const [submitted, setSubmitted] = React.useState(false);


  // Update personal info (nested object)
  const updatePersonal = (field, value) => {
    setFormData({
      ...formData,
      personal: {
        ...formData.personal,
        [field]: value
      }
    });
  };

  // Update address info (nested object)
  const updateAddress = (field, value) => {
    setFormData({
      ...formData,
      address: {
        ...formData.address,
        [field]: value
      }
    });
  };

  // Update payment info (nested object)
  const updatePayment = (field, value) => {
    setFormData({
      ...formData,
      payment: {
        ...formData.payment,
        [field]: value
      }
    });
  };

  // Handle step navigation
  const goToStep = (stepNumber) => {
    setFormData({
      ...formData,
      step: stepNumber
    });
  };

  const goToPreviousStep = () => {
    if (formData.step > 1) {
      goToStep(formData.step - 1);
    }
  };

  const goToNextStep = () => {
    if (formData.step < 3) {
      goToStep(formData.step + 1);
    }
  };

  // Handle form submission
  const handleSubmit = () => {
    console.log('Form Submitted:', formData);
    setSubmitted(true);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      step: 1,
      personal: { firstName: '', lastName: '', email: '' },
      address: { street: '', city: '', zipCode: '' },
      payment: { cardNumber: '', expiryDate: '', cvv: '' }
    });
    setSubmitted(false);
  };

  // If submitted, show success message
  if (submitted) {
    return (
        <div style={{
            maxWidth: '600px',
            margin: '2rem auto',
            padding: '2rem',
            backgroundColor: '#f0f9ff',
            border: '2px solid #22c55e',
            borderRadius: '12px',
            textAlign: 'center'
        }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <CheckCircle size={64} style={{ color: '#22c55e' }} />
        </div>
        <h2 style={{ color: '#16a34a', marginTop: 0 }}>✅ Form Submitted Successfully!</h2>
        <p style={{ color: '#555', marginBottom: '2rem' }}>
          Thank you for your information. We've received your details.
        </p>

        <div style={{
          backgroundColor: 'white',
          padding: '1.5rem',
          borderRadius: '8px',
          marginBottom: '1.5rem',
          textAlign: 'left',
          border: '1px solid #e5e7eb'
        }}>
          <h3 style={{ marginTop: 0, color: '#333' }}>📋 Your Submitted Data:</h3>
          <pre style={{
            backgroundColor: '#f3f4f6',
            padding: '1rem',
            borderRadius: '5px',
            overflow: 'auto',
            fontSize: '12px',
            margin: 0
          }}>
            {JSON.stringify(formData, null, 2)}
          </pre>
        </div>

        <button
          onClick={handleReset}
          style={{
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            padding: '0.75rem 1.5rem',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            fontWeight: 'bold'
          }}
        >
          Fill Form Again
        </button>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: '600px',
      margin: '2rem auto',
      padding: '2rem',
      backgroundColor: 'white',
      border: '1px solid #e5e7eb',
      borderRadius: '12px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
    }}>
      <h1 style={{ textAlign: 'center', color: '#1f2937', marginTop: 0 }}>
        📝 Multi-Step Form
      </h1>

      {/* Step Indicators */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '2rem',
        gap: '1rem'
      }}>
        {[1, 2, 3].map(stepNum => (
          <button
            key={stepNum}
            onClick={() => goToStep(stepNum)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              borderRadius: '8px',
              borderBottom: formData.step === stepNum ? '2px solid #3b82f6' : '2px solid #e5e7eb',
              color: formData.step === stepNum ? 'black' : '#666',
              cursor: 'pointer',
              fontWeight: formData.step === stepNum ? 'bold' : 'normal',
              transition: 'all 0.3s ease'
            }}
          >
            <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Step {stepNum}</div>
            <div style={{ fontSize: '0.85rem', marginTop: '0.25rem' }}>
              {stepNum === 1 && 'Personal Info'}
              {stepNum === 2 && 'Address'}
              {stepNum === 3 && 'Payment'}
            </div>
          </button>
        ))}
      </div>

      {/* Form Content */}
      <div>
        {/* Step 1: Personal Info */}
        {formData.step === 1 && (
          <div>
            <h2 style={{ color: '#333', marginTop: 0 }}>Personal Information</h2>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#555'
              }}>
                First Name *
              </label>
              <input
                type="text"
                value={formData.personal.firstName}
                onChange={(e) => updatePersonal('firstName', e.target.value)}
                placeholder="Enter your first name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#555'
              }}>
                Last Name *
              </label>
              <input
                type="text"
                value={formData.personal.lastName}
                onChange={(e) => updatePersonal('lastName', e.target.value)}
                placeholder="Enter your last name"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#555'
              }}>
                Email Address *
              </label>
              <input
                type="email"
                value={formData.personal.email}
                onChange={(e) => updatePersonal('email', e.target.value)}
                placeholder="Enter your email"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        )}

        {/* Step 2: Address */}
        {formData.step === 2 && (
          <div>
            <h2 style={{ color: '#333', marginTop: 0 }}>Address Information</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#555'
              }}>
                Street Address *
              </label>
              <input
                type="text"
                value={formData.address.street}
                onChange={(e) => updateAddress('street', e.target.value)}
                placeholder="Enter your street address"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#555'
              }}>
                City *
              </label>
              <input
                type="text"
                value={formData.address.city}
                onChange={(e) => updateAddress('city', e.target.value)}
                placeholder="Enter your city"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#555'
              }}>
                Zip Code *
              </label>
              <input
                type="text"
                value={formData.address.zipCode}
                onChange={(e) => updateAddress('zipCode', e.target.value)}
                placeholder="Enter your zip code"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>
        )}

        {/* Step 3: Payment */}
        {formData.step === 3 && (
          <div>
            <h2 style={{ color: '#333', marginTop: 0 }}>Payment Information</h2>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{
                display: 'block',
                marginBottom: '0.5rem',
                fontWeight: 'bold',
                color: '#555'
              }}>
                Card Number *
              </label>
              <input
                type="text"
                value={formData.payment.cardNumber}
                onChange={(e) => updatePayment('cardNumber', e.target.value)}
                placeholder="1234 5678 9012 3456"
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid #d1d5db',
                  fontSize: '1rem',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#555'
                }}>
                  Expiry Date *
                </label>
                <input
                  type="text"
                  value={formData.payment.expiryDate}
                  onChange={(e) => updatePayment('expiryDate', e.target.value)}
                  placeholder="MM/YY"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  marginBottom: '0.5rem',
                  fontWeight: 'bold',
                  color: '#555'
                }}>
                  CVV *
                </label>
                <input
                  type="text"
                  value={formData.payment.cvv}
                  onChange={(e) => updatePayment('cvv', e.target.value)}
                  placeholder="123"
                  style={{
                    width: '100%',
                    padding: '0.75rem',
                    borderRadius: '6px',
                    border: '1px solid #d1d5db',
                    fontSize: '1rem',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '1rem',
          marginTop: '2rem'
        }}>
          {formData.step > 1 && (
            <button
              onClick={goToPreviousStep}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#f3f4f6',
                color: '#333',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              <ChevronLeft size={20} /> Previous
            </button>
          )}

          {formData.step < 3 && (
            <button
              onClick={goToNextStep}
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              Next <ChevronRight size={20} />
            </button>
          )}

          {formData.step === 3 && (
            <button
              onClick={handleSubmit}
              style={{
                marginLeft: 'auto',
                padding: '0.75rem 2rem',
                backgroundColor: '#22c55e',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'all 0.3s'
              }}
            >
              Submit Form
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const TodoListWithPriorities = () => {
  // Keep your original structure, but transform strings to objects on init
    const [allTasks, setAllTasks] = React.useState(() => {
    const rawData = [
      { id: 1, priority: 'Low', task: ['Organize desk', 'Read a book', 'Go for a walk'] },
      { id: 2, priority: 'Medium', task: ['Grocery shopping', 'Clean the house', 'Repair the bike'] },
      { id: 3, priority: 'High', task: ['Finish project', 'Pay bills', 'Prepare presentation'] },
    ];

    // Transform strings into objects once, at initialization
    return rawData.map(group => ({
      ...group,
      task: group.task.map((text, idx) => ({
        id: `${group.id}-${idx}`, // Unique ID for each task
        text: text,
        completed: false
            }))
        }));
    });

    const [selectedPriority, setSelectedPriority] = React.useState('all');
    const [newTaskText, setNewTaskText] = React.useState('');
    const [newTaskPriority, setNewTaskPriority] = React.useState('Low');

  // NOW THIS IS SIMPLE - toggle without typeof checks!
  const toggleCompleted = (priorityId, taskId) => {
    setAllTasks(prevTasks =>
      prevTasks.map(group =>
        group.id === priorityId
          ? {
              ...group,
              task: group.task.map(t =>
                t.id === taskId ? { ...t, completed: !t.completed } : t
              )
            }
          : group
      )
    );
  };

  // Add a new task
  const addTask = (priorityId, taskText) => {
    if (!taskText.trim()) return;

    setAllTasks(prevTasks =>
      prevTasks.map(group =>
        group.id === priorityId
          ? {
              ...group,
              task: [
                ...group.task,
                {
                  id: `${priorityId}-${Date.now()}`,
                  text: taskText,
                  completed: false
                }
              ]
            }
          : group
      )
    );
  };

  // Delete a task
  const deleteTask = (priorityId, taskId) => {
    setAllTasks(prevTasks =>
      prevTasks.map(group =>
        group.id === priorityId
          ? {
              ...group,
              task: group.task.filter(t => t.id !== taskId)
            }
          : group
      )
    );
  };

  // Filter by priority
  const filteredTasks =
    selectedPriority === 'all'
      ? allTasks
      : allTasks.filter(group => group.priority === selectedPriority);

  const handleAddTask = () => {
    const targetGroup = allTasks.find(g => g.priority === newTaskPriority);
    if (targetGroup) {
      addTask(targetGroup.id, newTaskText);
      setNewTaskText('');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem', color: '#333' }}>📋 Todo List with Priorities</h1>

      {/* Filter Dropdown */}
      <div style={{ marginBottom: '2rem' }}>
        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          Filter by Priority:
        </label>
        <select
          value={selectedPriority}
          onChange={(e) => setSelectedPriority(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            borderRadius: '5px',
            border: '1px solid #ccc',
            fontSize: '1rem'
          }}
        >
          <option value="all">All Priorities</option>
          {allTasks.map(group => (
            <option key={group.id} value={group.priority}>
              {group.priority}
            </option>
          ))}
        </select>
      </div>

      {/* Add New Task */}
      <div
        style={{
          backgroundColor: '#f0f0f0',
          padding: '1rem',
          borderRadius: '8px',
          marginBottom: '2rem'
        }}
      >
        <h3 style={{ marginTop: 0 }}>Add New Task</h3>
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <input
            type="text"
            placeholder="Task description..."
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
            style={{
              flex: 1,
              padding: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select
            value={newTaskPriority}
            onChange={(e) => setNewTaskPriority(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: '5px',
              border: '1px solid #ccc',
              flex: 1
            }}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <button
            onClick={handleAddTask}
            style={{
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <Plus size={18} /> Add
          </button>
        </div>
      </div>

      {/* Task Groups */}
      {filteredTasks.map(group => (
        <TodoGroup
          key={group.id}
          group={group}
          onToggle={(taskId) => toggleCompleted(group.id, taskId)}
          onDelete={(taskId) => deleteTask(group.id, taskId)}
        />
      ))}
    </div>
  );
};

const TodoGroup = ({ group, onToggle, onDelete }) => {
    const getPriorityColor = (priority) => {
        const colors = {
            Low: '#90EE90',
            Medium: '#FFD700',
            High: '#FF6B6B'
        };
        return colors[priority] || '#ccc';
    };

    const completedCount = group.task.filter(t => t.completed).length;

    return (
        <div
        style={{
            backgroundColor: 'white',
            border: `2px solid ${getPriorityColor(group.priority)}`,
            borderRadius: '8px',
            padding: '1rem',
            marginBottom: '1.5rem'
        }}
        >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ margin: 0, color: '#333' }}>
          {group.priority} Priority
        </h3>
        <span
          style={{
            backgroundColor: getPriorityColor(group.priority),
            padding: '0.25rem 0.75rem',
            borderRadius: '20px',
            fontSize: '0.9rem',
            fontWeight: 'bold'
          }}
        >
          {completedCount}/{group.task.length} Done
        </span>
      </div>

      <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
        {group.task.map(task => (
          <li
            key={task.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.75rem',
              backgroundColor: task.completed ? '#f0f0f0' : 'white',
              borderRadius: '5px',
              marginBottom: '0.5rem',
              textDecoration: task.completed ? 'line-through' : 'none',
              color: task.completed ? '#999' : '#333'
            }}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
              style={{
                width: '18px',
                height: '18px',
                cursor: 'pointer'
              }}
            />
            <span style={{ flex: 1 }}>{task.text}</span>
            <button
              onClick={() => onDelete(task.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#999',
                padding: '0.25rem',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Delete task"
            >
              <Trash2 size={18} />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};