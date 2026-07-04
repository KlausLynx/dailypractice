// Exercise 1 — Basic Render Test
// Create a UserCard component that shows a user's name and email. Write tests to confirm both render correctly.

export default function UserCard({ name, email }) {
    return (
        <div>
            <h2>{name}</h2>
            <p>{email}</p>
        </div>
    )
}