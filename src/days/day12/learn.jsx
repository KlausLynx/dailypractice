import React, {useState } from "react"
import { useForm } from "react-hook-form"
import { CheckCircleIcon, ImageIcon, X } from "lucide-react";

export default function MainComponent() {

    return(
        <div className="grid gap-2 grid-cols-3 overflow-y-auto p-4">
            <UserRegForm />
            <SurveyForm />
            <ImageUploader />
            <MyForm />
            <DynamicSkillForms />
            <DynamicSkillFormsh />
        </div>
    )
}

// Exercise 1: User Registration Form
// Create a registration form with:

// Email (required, valid email format)
// Password (min 8 chars, must match confirmation)
// Accept terms checkbox (must be checked)
// Display all errors and prevent submission

function UserRegForm() {

    const [formData, setFormData] = React.useState({
        email: '',
        password: '',
        ischecked: false
    });

    const [submitted, setSubmitted] = React.useState(false);

    const [error, setError] = React.useState({});

    const handleFieldChange = (e) => {
        const {name, value, type, checked} = e.target;
        const checkedValue = type === 'checkbox' ? checked : value
        const upDatedForm = {...formData, [name]: checkedValue};

        setFormData(upDatedForm);

        const validatorsErrors = validate(name, upDatedForm);
        setError(validatorsErrors)
    };

    const validate = (formName = null, dataToValidate = formData) => {

        const newErrors = {...error};

        if(!formName || formName === 'email') {
            if (!dataToValidate.email) {
                newErrors.email = 'Email is required'
            } else if(!dataToValidate.email.includes('@')) {
                newErrors.email = 'Email must contain @ symbol'
            } else {
                delete newErrors.email;
            }
        }

        if(!formName || formName === 'password') {
            if (!dataToValidate.password) {
                newErrors.password = 'Password is required'
            } else if (!dataToValidate.password.match(/^(?=.*[A-Z])(?=.*\d).{6,}$/)) {
                newErrors.password = 'Password must contain 6 characters, 1 uppercase, 1 number'
            } else {
                delete newErrors.password;
            }
        }

        if(!formName || formName === 'ischecked') {
            if(!dataToValidate.ischecked) {
                newErrors.ischecked = 'You must Agree with Terms and Conditions'
            } else {
                delete newErrors.ischecked;
            }
        }

        return newErrors;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const validateErrors = validate()
        setError(validateErrors) 
        
        if(Object.keys(validateErrors).length === 0) {
            setSubmitted(true);
          
        }
    };

    const handleReset = () => {
        setFormData({
            email: '',
            password: '',
            ischecked: false
        })
        setSubmitted(false)
    };

    if (submitted) {
        return(
            <div className="bg-green-500 p-3 flex flex-col max-w-2xl max-h-32">
                <div className="mx-auto">
                    <CheckCircleIcon />
                </div>
                <h2>Form Submitted Sucessfully</h2>
                <p>Thank u for your information...We have received your details</p>
                <div>
                    <h3>Your Submitted Data: </h3>
                    <pre>
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
                <button style={{
                    backgroundColor: 'orangered',
                    padding: '.3rem'
                }} onClick={handleReset}>
                    Fill Form Again
                </button>
            </div>
        )
    }

    return(
        <div className="bg-blue-500 p-3 flex flex-col h-64 max-w-2xl">
            <form action="">
                <div>
                    <div>
                        <label htmlFor="Email">Email:</label>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleFieldChange} />
                    </div>

                    {error.email && <span>{error.email}</span>}

                    <div>
                        <label htmlFor="Password">Password:</label>
                        <input type="password" name="password" placeholder="password" value={formData.password} onChange={handleFieldChange}/>
                    </div>
                    {error.password && <span>{error.password}</span>}

                </div>
                <div>
                    <input type="checkbox" name="ischecked" checked={formData.ischecked} onChange={handleFieldChange}/>
                </div>
                    {error.ischecked && <span style={{color: 'red'}}>{error.ischecked}</span>}

                <button style={
                    {
                        backgroundColor: 'blue',
                        padding: '.5rem',
                        borderRadius: '5px'
                    }
                } type="submit" onClick={handleSubmit}>Register</button>

            </form>
        </div>
    )
}

// Build a form with:

// Text inputs for name
// Radio buttons for satisfaction level (1-5)
// Checkboxes for favorite topics (multi-select)
// Submit button that displays results

const SurveyForm = () => {

    const [formData, setFormData ] = useState ({
        userName: '',
        satisfaction: '',
        javascript: false,
        react: false,
        nodejs: false
    });

    const [errors, setErrors] = React.useState({});

    const [submitted, setSubmitted] = React.useState(false);

    const handlefieldCheck = (e) => {
        const {name, type, checked, value} = e.target;
        const fieldValue = type === 'checkbox' ? checked : value;
        const upDatedForm = {...formData, [name]: fieldValue};

        setFormData(upDatedForm);

        const validateErrors = validate(name, upDatedForm);
        setErrors(validateErrors);
    };

    const validate = (formName = null, dataToValidate = formData) => {
        const newErrors = {...errors};
        
        if (!formName || formName === 'userName') {
            if (!dataToValidate.userName) {
                newErrors.userName = 'Name is required';
            } else {
                delete newErrors.userName;
            }
        }

        if (!formName || formName === 'satisfaction') {
            if (!dataToValidate.satisfaction) {
                newErrors.satisfaction = 'Please select a satisfaction level'
            } else {
                delete newErrors.satisfaction;
            }
        }

        if (!formName || formName === 'javascript' || formName === 'react' || formName === 'nodejs') {
            const hasAtleastOne = dataToValidate.javascript || dataToValidate.nodejs || dataToValidate.react
            if (!hasAtleastOne) {
                newErrors.topics = 'Please select atleast on favourite topic'
            } else {
                delete newErrors.topics
            }
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const validateErrors = validate();
        setErrors(validateErrors);

        if (Object.keys(validateErrors).length > 0) {
            console.log('Form has Errors:', validateErrors); 
        } else {
            setSubmitted(true);
            console.log('Form is submitted:', formData);
        }
    }

    const handleReset = () => {
        setFormData({
            userName: '',
            satisfaction: '',
            javascript: false,
            react: false,
            nodejs: false
        })
        setSubmitted(false)
    };

    if (submitted) {
        return(
            <div className="bg-green-500 p-3 flex flex-col max-w-2xl">
                <div className="mx-auto">
                    <CheckCircleIcon />
                </div>
                <h2>Form Submitted Sucessfully</h2>
                <p>Thank u for your information...We have received your details</p>
                <div>
                    <h3>Your Submitted Data: </h3>
                    <pre>
                        {JSON.stringify(formData, null, 2)}
                    </pre>
                </div>
                <button style={{
                    backgroundColor: 'orangered',
                    padding: '.3rem'
                }} onClick={handleReset}>
                    Fill Form Again
                </button>
            </div>
        )
    }

    return(
        <div className="bg-blue-500 p-3 flex flex-col h-72 max-w-2xl">
            <form action="" onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder="name" name="userName" value={formData.userName} onChange={handlefieldCheck} />
                </div>

                <div>
                    {[1, 2, 3, 4, 5].map(satisfyNum => (
                        <label 
                            key={satisfyNum}
                            style={{
                                display: 'inline-block',
                                width: '40px',
                                height: '40px',
                                lineHeight: '40px',
                                textAlign: 'center',
                                border: '2px solid #ccc',
                                borderRadius: '50%',
                                margin: '5px',
                                cursor: 'pointer',
                                backgroundColor: formData.satisfaction === satisfyNum.toString() ? '#007bff' : 'white',
                                color: formData.satisfaction === satisfyNum.toString() ? 'white' : 'black'
                            }}
                        >
                            <input type="radio" name="satisfaction" value={satisfyNum} checked={formData.satisfaction === satisfyNum.toString()} style={{display: 'none'}} onChange={handlefieldCheck} id="" />                         
                            {satisfyNum}
                        </label>
                    ))}
                </div>

                <div>
                    <h3>Favourite Topics</h3>
                    <label htmlFor="">
                        <input type="checkbox" name="javascript" checked={formData.javascript} onChange={handlefieldCheck} id="" />

                        {' '}Javascript
                    </label>

                    {['React', 'Nodejs'].map(favTopics => (
                        <label htmlFor="" key={favTopics}>
                            <input type="checkbox" name={favTopics.toLowerCase()} checked={formData[favTopics.toLowerCase()]} onChange={handlefieldCheck} id="" />
                            {' '}{favTopics.charAt(0) + favTopics.slice(1)}
                        </label>
                    ))}
                </div>


                <button className="p-2 bg-green-600 mt-2 rounded-md" type="submit">Submit Results</button>
            </form>
        </div>
    )
}

// Exercise 3: Image Upload Preview
// Create a component with:

// File input accepting images only
// Image preview before upload
// File info (name, size)
// Simple upload simulation

const ImageUploader = () => {
    const [file, setFile] = useState(null);
     const [files, setFiles] = useState([]);
    // const [previewUrl, setPreviewUrl] = useState(null);
    // const [uploadStatus, setUploadStatus] = useState('');
    const [preview, setPreview] = useState(null);
   

    const handleFile = (e) => {
        const selectedFile = e.target.files[0];

        if (selectedFile) {
            setFile(selectedFile);
            console.log(selectedFile)

            // const url = URL.createObjectURL(file);
            // setPreviewUrl(url)
            // console.log(url)

            if (selectedFile.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                   console.log(event.target.result)
                   setPreview(event.target.result)
                };
                reader.readAsDataURL(selectedFile);
            }
        }
    }

    const handleMultipleFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length > 0) setFiles(selectedFiles);
        console.log(selectedFiles)
    }

    const handleClear = () => {
        setFile(null)
        // setPreviewUrl(null)
    }

    const formatFileSize = (bytes) => {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
    }
    return (
        <div className="bg-linear-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">Image Upload</h1>

                {!file ? (
                    <label className="block" htmlFor="">
                        <div className="border-2 border-dashed">
                            <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                            <p className="text-gray-600 mb-2">Click to select an image</p>
                            <p className="text-sm teext-gray-400">PNG, JPG, GIF up to 10MB</p>
                        </div>
                        <input type="file" accept="image/*" onChange={handleFile} />
                    </label>
                ) : (
                    <div className="space-y-4">
                        {/* Image Preview */}
                        <div className="relative rounded-xl overflow-hidden bg-gray-100">
                            <img
                                src={preview}
                                alt="Preview"
                                className="w-full h-64 object-contain"
                            />
                            <button
                                onClick={handleClear}
                                className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    

                        <div>
                            <p className="text-sm font-semibold text-gray-700 mb-1">File Name:</p>
                            <p className="text-sm text-gray-600 mb-3 truncate">{file.name}</p>
                            <p className="text-sm font-semibold text-gray-700 mb-1">File Size</p>
                            <p className="text-sm text-gray-600">{formatFileSize(file.size)}</p>
                        </div>
                    </div>
                )}

                {/* Multiple Files */}

                {files.length === 0 ? (
                    <div>
                        <label className="block mt-6" htmlFor="">
                            <div className="border-2 border-dashed p-4">
                                <h3>Multiple Files</h3>
                               <input type="file" name="files" multiple id="multipleFiles" onChange={handleMultipleFiles} />
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className="mt-4">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Selected Files:</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                            {files.length > 0 && (
                                <ul>
                                      {files.map((fileItem, index) => (
                                        <li key={index} className="flex items-center space-x-4 p-2 border rounded-lg">
                                       {fileItem.name} - {formatFileSize(fileItem.size)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
// Exercise 4: Custom useForm Hook
function MyForm() {
  const {
    register,
    handleSubmit,
    setValue, // Destructure setValue to update field states
    formState: { errors, isDirty, isValid, touchedFields }
    } = useForm({
    defaultValues: { email: "", password: "" },
    mode: "onChange"
  });

  const setFieldValue = (name, value) => {
    setValue(name, value, { 
      shouldValidate: true, 
      shouldDirty: true, 
      shouldTouch: true 
    });
  };

  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        {...register("email", { required: "Email is required" })} 
        placeholder="Email"  
        className={touchedFields.email ? "input-touched" : "input-pristine"}
      />
      {errors.email && <p>{errors.email.message}</p>}

      <input 
        type="password" 
        {...register("password", { required: "Password is required" })} 
        placeholder="Password"  
        className={touchedFields.password ? "input-touched" : "input-pristine"} 
      />
      {errors.password && <p>{errors.password.message}</p>}

      <button 
        type="button"
        className="bg-green-300 p-1" 
        onClick={() => setFieldValue("email", "test@example.com")}
      >
        Fill Demo Email
      </button>

      <button 
        type="submit" 
        className={`p-2 rounded-md transition-colors ${
          !isDirty || !isValid 
            ? "bg-gray-400 cursor-not-allowed" 
            : "bg-amber-800 hover:bg-amber-900 text-white"
        }`}
        disabled={!isDirty || !isValid}
      >
        Submit
      </button>
    </form>
  );
}

const DynamicSkillForms = () => {
  const [skills, setSkills] = React.useState([]);

  const handleSkillChange = (e, skillId) => {
    const { name, value } = e.target;

    setSkills(prevSkills =>
      prevSkills.map(skill =>
        skill.id === skillId
          ? { ...skill, [name]: value }
          : skill
      )
    );
  };

  const addSkill = () => {
    const newSkill = {
      id: crypto.randomUUID(),
      name: '',
      level: 'learning'
    };

    setSkills(prevSkills => [...prevSkills, newSkill]);
  };

  const removeSkill = (skillId) => {
    setSkills(prevSkills =>
      prevSkills.filter(skill => skill.id !== skillId)
    );
  };

  return (
    <div>
      <h2>Dynamic Skill Forms</h2>

      <button onClick={addSkill}>Add Skill</button>

      {skills.map(skill => (
        <div
          key={skill.id}
          style={{ border: '1px solid gray', margin: '5px', padding: '5px' }}
        >
          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={skill.name}
            onChange={(e) => handleSkillChange(e, skill.id)}
          />

          <select
            name="level"
            value={skill.level}
            onChange={(e) => handleSkillChange(e, skill.id)}
          >
            <option value="learning">Learning</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>

          <button onClick={() => removeSkill(skill.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Summary</h3>
      <ul>
        {skills.map(skill => (
          <li key={skill.id}>
            {skill.name || 'Unnamed skill'} — {skill.level}
          </li>
        ))}
      </ul>
    </div>
  );
};

const useDynamicSkills = () => {
  const [values, setValues] = useState([]);

  const addItem = () => {
    setValues(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "",
        level: "learning",
      },
    ]);
  };

  const removeItem = (id) => {
    setValues(prev => prev.filter(item => item.id !== id));
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    setValues(prev =>
      prev.map(item =>
        item.id === id ? { ...item, [name]: value } : item
      )
    )
  };

  const resetForm = () => setValues([]);

  return { values, addItem, removeItem, handleChange, resetForm };
};

// ===== Component =====
const DynamicSkillFormsh = () => {
  const { values: skills, addItem, removeItem, handleChange, resetForm } = useDynamicSkills();

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h2>Dynamic Skill Forms</h2>

      <button onClick={addItem}>Add Skill</button>
      <button onClick={resetForm} style={{ marginLeft: "10px" }}>Reset All</button>

      {skills.map(skill => (
        <div
          key={skill.id}
          style={{ border: "1px solid gray", margin: "5px", padding: "5px" }}
        >
          <input
            type="text"
            name="name"
            placeholder="Skill Name"
            value={skill.name}
            onChange={(e) => handleChange(skill.id, e)}
            style={{ marginRight: "10px" }}
          />

          <select
            name="level"
            value={skill.level}
            onChange={(e) => handleChange(skill.id, e)}
            style={{ marginRight: "10px" }}
          >
            <option value="learning">Learning</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>

          <button onClick={() => removeItem(skill.id)}>Remove</button>
        </div>
      ))}

      <h3>Summary</h3>
      <ul>
        {skills.map(skill => (
          <li key={skill.id}>
            {skill.name || "Unnamed skill"} — {skill.level}
          </li>
        ))}
      </ul>
    </div>
  );
};