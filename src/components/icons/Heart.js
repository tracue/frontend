import * as React from "react"

function Heart(props) {
    return (
        <svg
            width={25}
            height={22}
            viewBox="0 0 25 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M12.5 1.903a7.518 7.518 0 00-10.303.287 7.459 7.459 0 000 10.572l8.535 8.508c.977.973 2.56.973 3.536 0l8.535-8.508a7.459 7.459 0 000-10.572A7.518 7.518 0 0012.5 1.903zm-1.464 2.049l.58.578c.488.487 1.28.487 1.768 0l.58-.578a5.011 5.011 0 017.071 0 4.972 4.972 0 010 7.048L12.5 19.508 3.964 11a4.973 4.973 0 010-7.048 5.011 5.011 0 017.072 0z"
                fill="#0D0D0D"
            />
        </svg>
    )
}

export default Heart