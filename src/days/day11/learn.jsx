import React from 'react';
import { useState } from 'react';
import {Star, Search, CheckCircle} from 'lucide-react';

export default function MainComponent() {
  const mainContStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    backgroundColor: '#f5f5f5',
    maxWidth: '1400px',
    width: '100%',
    margin: '2rem auto',
    padding: '2rem',
    gap: '2rem',
  };
  
  return (
    <div style={mainContStyle}>
        <div>
            <MovieRatingForm />
        </div>
        <div>
            <ProductFilter />
        </div>
        <div>
            <RegistrationForm />
        </div>
        <div>
          <DynamicFormFields />
        </div>
    </div>
  );
}

const MovieRatingForm = () => {
  const [formData, setFormData] = React.useState({
    movieName: '',
    rating: '',
  });

  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      movieName: '',
      rating: '',
    });
    setSubmitted(false);
  };

  // Convert 1-10 rating to 5-star scale
  const getStarRating = () => {
    const numRating = Number(formData.rating);
    if(!numRating || numRating < 1 ) return 0;
    return (numRating / 10) * 5;
  };

  const starRating = getStarRating();

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  };

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#d3d3d3', padding: '1rem', borderRadius: '8px' }}>
        <h2>Thank You!</h2>
        <p>Your review for <strong>{formData.movieName}</strong> with a rating of <strong>{formData.rating}/10</strong> has been submitted.</p>
        <button onClick={handleReset} style={{ padding: '10px 20px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Submit Another Review</button>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#d3d3d3', padding: '1rem', borderRadius: '8px' }}>
      <h2>Movie Rating Form</h2>
      <div style={formStyle}>
        <label style={{display: 'block', marginBottom: '0.5rem'}}>
          Movie Name:
          <input type="text" name="movieName" value={formData.movieName} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        </label>
        <br />
        <label style={{display: 'block', marginBottom: '0.5rem'}}>
          Rating: 1/10
          <input type="number" name="rating" min={0} max={10} value={formData.rating} onChange={handleChange} style={{ width: '100%', padding: '0.5rem', marginTop: '0.25rem', borderRadius: '4px', border: '1px solid #d1d5db' }} />
        </label>

        <div style={{display: 'flex', gap: '4px', marginTop: '0.5rem'}}>
          {[1,2,3,4,5].map((star) =>(
            <Star
              key={star}
              size={32}
              fill={star <= starRating ? '#ff9800' : 'none'}
              style={{
                color: star <= starRating ? '#ff9800' : '#e0e0e0',
              }}
            />
          ))}
          {formData.rating && (
            <span style={{marginLeft: '8px', fontSize: '1.2rem'}}>{formData.rating}/10</span>
          )}
        </div>
        
        <button type="button" style={{ padding: '10px 20px', backgroundColor: '#2196f3', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }} onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

const ProductFilter = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState('');
  const [priceRange, setPriceRange] = React.useState(1000);
  const [stockFilter, setStockFilter] = React.useState('all');

  // Sample products - now dynamic!
  const [allProducts, setAllProducts] = React.useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 899, inStock: true },
    { id: 2, name: 'T-Shirt', category: 'Clothing', price: 25, inStock: true },
    { id: 3, name: 'Novel', category: 'Books', price: 15, inStock: false },
    { id: 4, name: 'Blender', category: 'Home & Kitchen', price: 79, inStock: true },
    { id: 5, name: 'Tennis Racket', category: 'Sports', price: 120, inStock: false },
    { id: 6, name: 'Headphones', category: 'Electronics', price: 199, inStock: true },
    { id: 7, name: 'Jeans', category: 'Clothing', price: 60, inStock: true },
    { id: 8, name: 'Cookbook', category: 'Books', price: 30, inStock: false },
  ]);

  const [showAddForm, setShowAddForm] = React.useState(false);
  const [newProduct, setNewProduct] = React.useState({
    name: '',
    category: '',
    price: '',
    inStock: true
  });

  // Extract unique categories from products
  const categories = [...new Set(allProducts.map(product => product.category))];

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPriceRange(Number(e.target.value));
  };

  const handleReset = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange(1000);
    setStockFilter('all');
  };

  const handleAddProduct = () => {
    if (newProduct.name && newProduct.category && newProduct.price) {
      const product = {
        id: Date.now(),
        name: newProduct.name,
        category: newProduct.category,
        price: Number(newProduct.price),
        inStock: newProduct.inStock
      };
      setAllProducts([...allProducts, product]);
      setNewProduct({ name: '', category: '', price: '', inStock: true });
      setShowAddForm(false);
    }
  };

  const handleDeleteProduct = (id) => {
    setAllProducts(allProducts.filter(product => product.id !== id));
  };

  const toggleStock = (id) => {
    setAllProducts(allProducts.map(product => 
      product.id === id ? { ...product, inStock: !product.inStock } : product
    ));
  };

  // Filter products based on all criteria
  const filteredProducts = allProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.price <= priceRange;
    const matchesStock = stockFilter === 'all' || 
                        (stockFilter === 'inStock' && product.inStock) || 
                        (stockFilter === 'outOfStock' && !product.inStock);
    
    return matchesSearch && matchesCategory && matchesPrice && matchesStock;
  });

  return (
    <div style={{ display: 'flex', gap: '2rem', fontFamily: 'system-ui, sans-serif' }}>
      {/* Filter Sidebar */}
      <div style={{ 
        width: '300px', 
        backgroundColor: '#f3f4f6', 
        padding: '1.5rem',
        borderRadius: '8px',
        height: 'fit-content'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '1.5rem' }}>Filter Products</h2>
        <div>
          {/* Search */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="search" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Search Products
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="search" 
                id="search"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                style={{ 
                  width: '100%', 
                  padding: '0.5rem 0.5rem 0.5rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '4px',
                  boxSizing: 'border-box'
                }}
              />
              <Search 
                size={18} 
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280'
                }} 
              />
            </div>
          </div>

          {/* Category */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Category
            </label>
            <select 
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor="priceRange" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Price Range: ${priceRange}
            </label>
            <input 
              type="range" 
              id="priceRange"
              value={priceRange}
              min="0" 
              max="1000"
              onChange={handlePriceChange}
              style={{ width: '100%' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: '#6b7280' }}>
              <span>$0</span>
              <span>$1000</span>
            </div>
          </div>

          {/* Stock Status */}
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
              Availability
            </label>
            <select 
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                boxSizing: 'border-box'
              }}
            >
              <option value="all">All Products</option>
              <option value="inStock">In Stock Only</option>
              <option value="outOfStock">Out of Stock Only</option>
            </select>
          </div>

          {/* Reset Button */}
          <button 
            type="button"
            onClick={handleReset}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Products Display */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <h2 style={{ margin: 0 }}>
            Products ({filteredProducts.length})
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#10b981',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            {showAddForm ? 'Cancel' : '+ Add Product'}
          </button>
        </div>

        {/* Add Product Form */}
        {showAddForm && (
          <div style={{
            backgroundColor: '#f3f4f6',
            padding: '1.5rem',
            borderRadius: '8px',
            marginBottom: '1.5rem'
          }}>
            <h3 style={{ marginTop: 0 }}>Add New Product</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Product Name
                </label>
                <input
                  type="text"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="Enter product name"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Category
                </label>
                <input
                  type="text"
                  value={newProduct.category}
                  onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                  placeholder="Enter category"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
                  Price ($)
                </label>
                <input
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                  placeholder="Enter price"
                  style={{
                    width: '100%',
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={newProduct.inStock}
                    onChange={(e) => setNewProduct({ ...newProduct, inStock: e.target.checked })}
                    style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                  />
                  <span style={{ fontWeight: '500' }}>In Stock</span>
                </label>
              </div>
              <button
                onClick={handleAddProduct}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Add Product
              </button>
            </div>
          </div>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          {filteredProducts.map(product => (
            <div 
              key={product.id}
              style={{
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                padding: '1rem',
                backgroundColor: 'white',
                position: 'relative',
                opacity: product.inStock ? 1 : 0.6
              }}
            >
              <button
                onClick={() => handleDeleteProduct(product.id)}
                style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  backgroundColor: '#ef4444',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.25rem 0.5rem',
                  cursor: 'pointer',
                  fontSize: '0.75rem'
                }}
              >
                Delete
              </button>
              
              <div style={{
                position: 'absolute',
                top: '0.5rem',
                left: '0.5rem',
                backgroundColor: product.inStock ? '#10b981' : '#ef4444',
                color: 'white',
                padding: '0.25rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.75rem',
                fontWeight: '500'
              }}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
              </div>

              <h3 style={{ margin: '1.5rem 0 0.5rem 0', fontSize: '1.125rem', paddingRight: '4rem' }}>
                {product.name}
              </h3>
              <p style={{ margin: '0 0 0.5rem 0', color: '#6b7280', fontSize: '0.875rem' }}>
                {product.category}
              </p>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', fontSize: '1.25rem', color: '#059669' }}>
                ${product.price}
              </p>
              
              <button
                onClick={() => toggleStock(product.id)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: product.inStock ? '#f59e0b' : '#10b981',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  marginTop: '0.5rem'
                }}
              >
                {product.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
              </button>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <p style={{ color: '#6b7280', textAlign: 'center', marginTop: '2rem' }}>
            No products match your filters
          </p>
        )}
      </div>
    </div>
  );
}

// Registration form with validation

const RegistrationForm = () => {
    const [formData, setFormData] = React.useState({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      country: '',
      age: '',
      dob: ''
    });

    const [errors, setErrors] = React.useState({});

    const [submitted, setSubmitted] = React.useState(false);


    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.firstname) newErrors.firstname = 'First name is required';
        if (!formData.lastname) newErrors.lastname = 'Last name is required';
        if (!formData.phonenumber) newErrors.phonenumber = 'Phone number is required';
        if (!formData.country) newErrors.country = 'Country is required';
        if (!formData.age || formData.age < 0) newErrors.age = 'Valid age is required';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
     
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            console.log('Form submitted:', formData);
            setErrors({});
            setSubmitted(true)
        }
    }

    const formValidation = (e) => {
        const { name, value } = e.target;
        const newErrors = { ...errors }; // Keep existing errors
        
        // Only validate the field that triggered the event
        if (name === 'username' && value.length < 8) {
            newErrors.username = 'Username must contain 8 characters and above';
        } else if (name === 'username') {
            delete newErrors.username; // Clear error if valid
        }
        
        if (name === 'email' && !value.includes('@')) {
            newErrors.email = 'Email must contain @ symbol';
        } else if (name === 'email') {
            delete newErrors.email;
        }
        
        if (name === 'password' && !value.match(/^(?=.*[A-Z])(?=.*\d).{6,}$/)) {
            newErrors.password = 'Password must contain 6 characters, 1 uppercase, 1 number';
        } else if (name === 'password') {
            delete newErrors.password;
        }
        
        if (name === 'confirmPassword' && value !== formData.password) {
            newErrors.confirmPassword = 'Passwords must match';
        } else if (name === 'confirmPassword') {
            delete newErrors.confirmPassword;
        }
        
        setErrors(newErrors);
    }

    const handleReset = () => {
        setSubmitted(false)
        setFormData({
            ...formData,
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
            firstname: '',
            lastname: '',
            phonenumber: '',
            country: '',
            age: '',
            dob: ''
        })
    }

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
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', margin: '0 auto', backgroundColor: 'blue', padding: '1rem', borderRadius: '8px' }}>
            <h2>Registration Form</h2>
            <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} onKeyUp={formValidation}  />
            {errors.username && <span style={{ color: 'red' }}>{errors.username}</span>}
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} onKeyUp={formValidation} />
            {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
            <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} onKeyUp={formValidation} />
            {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
            <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} onKeyUp={formValidation} />
            {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
            <input type="text" name="firstname" placeholder="First Name" value={formData.firstname} onChange={handleChange} />
            {errors.firstname && <span style={{ color: 'red' }}>{errors.firstname}</span>}
            <input type="text" name="lastname" placeholder="Last Name" value={formData.lastname} onChange={handleChange} />
            {errors.lastname && <span style={{ color: 'red' }}>{errors.lastname}</span>}
            <input type="number" name="phonenumber" placeholder='Phone Number' value={formData.phonenumber} onChange={handleChange} />
            {errors.phonenumber && <span style={{ color: 'red' }}>{errors.phonenumber}</span>}
            <input type="text" name="country" placeholder="Country" value={formData.country} onChange={handleChange} />
            {errors.country && <span style={{ color: 'red' }}>{errors.country}</span>}
            <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} />
            {errors.age && <span style={{ color: 'red' }}>{errors.age}</span>}
            <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
            {errors.dob && <span style={{ color: 'red' }}>{errors.dob}</span>}
            <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Register</button>
        </form>
    );
}

function DynamicFormFields() {
  const [formData, setFormData] = useState({
    country: 'us',
    name: '',
    usState: '',
    ukCounty: '',
    canadaProvince: '',
    australiaState: ''
  });

  // Define country-specific fields
  const countryFields = {
    us: {
      label: 'United States',
      field: 'usState',
      type: 'select',
      options: ['California', 'Texas', 'Florida', 'New York', 'Washington']
    },
    uk: {
      label: 'United Kingdom',
      field: 'ukCounty',
      type: 'input',
      placeholder: 'Enter your county (e.g., Yorkshire, Kent)'
    },
    canada: {
      label: 'Canada',
      field: 'canadaProvince',
      type: 'select',
      options: ['Ontario', 'British Columbia', 'Quebec', 'Alberta', 'Manitoba']
    },
    australia: {
      label: 'Australia',
      field: 'australiaState',
      type: 'select',
      options: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia', 'South Australia']
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = () => {
    const country = countryFields[formData.country];
    const regionValue = formData[country.field];
    
    console.log('Form submitted:', {
      name: formData.name,
      country: country.label,
      region: regionValue
    });
    
    alert(`Registration complete!\n\nName: ${formData.name}\nCountry: ${country.label}\nRegion: ${regionValue}`);
    
    // Reset
    setFormData({
      country: 'us',
      name: '',
      usState: '',
      ukCounty: '',
      canadaProvince: '',
      australiaState: ''
    });
  };

  const currentCountry = countryFields[formData.country];
  const regionValue = formData[currentCountry.field];
  const isFormValid = formData.name && regionValue;

  return (
    <div style={{ padding: '30px', fontFamily: 'Arial', maxWidth: '450px', margin: '0 auto' }}>
      <h1>🌍 International Registration</h1>
      <p style={{ color: '#666' }}>Fill in your details based on your country</p>

      {/* Name Input - Always shown */}
      <div style={{ marginBottom: '20px' }}>
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '5px',
            fontSize: '14px',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        />
      </div>

      {/* Country Selector - Always shown */}
      <div style={{ marginBottom: '20px' }}>
        <label>Select Your Country:</label>
        <select
          name="country"
          value={formData.country}
          onChange={handleChange}
          style={{
            width: '100%',
            padding: '10px',
            marginTop: '5px',
            fontSize: '14px',
            boxSizing: 'border-box',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
        >
          <option value="us">United States</option>
          <option value="uk">United Kingdom</option>
          <option value="canada">Canada</option>
          <option value="australia">Australia</option>
        </select>
      </div>

      {/* DYNAMIC FIELDS - Changes based on country selection */}
      <div style={{ marginBottom: '20px' }}>
        <label>{currentCountry.label} - {currentCountry.type === 'select' ? 'Region/State' : 'County'}:</label>

        {/* If it's a select dropdown */}
        {currentCountry.type === 'select' && (
          <select
            name={currentCountry.field}
            value={regionValue}
            onChange={handleChange}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              fontSize: '14px',
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          >
            <option value="">-- Select --</option>
            {currentCountry.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        )}

        {/* If it's a text input */}
        {currentCountry.type === 'input' && (
          <input
            type="text"
            name={currentCountry.field}
            value={regionValue}
            onChange={handleChange}
            placeholder={currentCountry.placeholder}
            style={{
              width: '100%',
              padding: '10px',
              marginTop: '5px',
              fontSize: '14px',
              boxSizing: 'border-box',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        )}
      </div>

      {/* Summary Card */}
      <div style={{
        backgroundColor: '#e7f3ff',
        border: '1px solid #b3d9ff',
        padding: '15px',
        borderRadius: '5px',
        marginBottom: '20px',
        fontSize: '14px'
      }}>
        <strong>📋 Your Details:</strong>
        <p style={{ marginTop: '8px', marginBottom: '5px' }}>
          <strong>Name:</strong> {formData.name || 'Not provided'}
        </p>
        <p style={{ marginBottom: '5px' }}>
          <strong>Country:</strong> {currentCountry.label}
        </p>
        <p>
          <strong>Region:</strong> {regionValue || 'Not selected'}
        </p>
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={!isFormValid}
        style={{
          width: '100%',
          padding: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          backgroundColor: isFormValid ? '#007bff' : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: isFormValid ? 'pointer' : 'not-allowed',
          transition: 'background-color 0.3s'
        }}
      >
        {isFormValid ? '✓ Complete Registration' : 'Fill all fields'}
      </button>
    </div>
  );
}