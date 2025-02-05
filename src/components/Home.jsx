import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
// Use react-router for navigation
import chestImage from "../images/chest.png"; // Use ../ to go up one directory
import backImage from "../images/back.png";
import shoulderImage from "../images/shoulder.png";
import armsImage from "../images/arms.jpeg";
import absImage from "../images/abs.png";
import legsImage from "../images/legs.png";
import tricepsImage from "../images/triceps.png";


// You can use an <img> tag instead

const workouts = [
  {
    name: "Chest Workout",
    exercises: [
      { name: "Bench Press", sets: 3, reps: "8-12" },
      { name: "Incline Dumbbell Press", sets: 3, reps: "10-15" },
      { name: "Cable Flyes", sets: 3, reps: "12-15" },
    ],
    image: chestImage,
  },
  {
    name: "Back Workout",
    exercises: [
      { name: "Pull-ups", sets: 3, reps: "Max" },
      { name: "Bent-over Rows", sets: 3, reps: "8-12" },
      { name: "Lat Pulldowns", sets: 3, reps: "10-15" },
    ],
    image: backImage,
  },
  {
    name: "Leg Workout",
    exercises: [
      { name: "Squats", sets: 4, reps: "8-10" },
      { name: "Leg Press", sets: 3, reps: "12-15" },
      { name: "Lunges", sets: 3, reps: "10 each leg" },
    ],
    image: legsImage,
  },
  {
    name: "Abs Workout",
    exercises: [
      { name: "Crunches", sets: 3, reps: "15-20" },
      { name: "Plank", sets: 3, reps: "30-60 seconds" },
      { name: "Russian Twists", sets: 3, reps: "20 each side" },
    ],
    image: absImage,
  },
  {
    name: "Arms Workout",
    exercises: [
      { name: "Bicep Curls", sets: 3, reps: "10-12" },
      { name: "Hammer Curls", sets: 3, reps: "10-12" },
      { name: "Tricep Pushdowns", sets: 3, reps: "12-15" },
    ],
    image: armsImage,
  },
  {
    name: "Shoulder Workout",
    exercises: [
      { name: "Military Press", sets: 3, reps: "8-10" },
      { name: "Lateral Raises", sets: 3, reps: "12-15" },
      { name: "Front Raises", sets: 3, reps: "12-15" },
    ],
    image: shoulderImage,
  },
  {
    name: "Triceps Workout",
    exercises: [
      { name: "Close-Grip Bench Press", sets: 3, reps: "8-12" },
      { name: "Tricep Dips", sets: 3, reps: "10-15" },
      { name: "Overhead Tricep Extension", sets: 3, reps: "12-15" },
    ],
    image: tricepsImage,
  },
];
  // Your workouts array here...

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <header className="bg-black shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className={`transition-opacity duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
            <h1 className="text-4xl font-bold text-white">B3</h1>
            <p className="text-lg text-gray-400">Your Personal Exercise Tracker Which is Count Your Calories On Daily Basics </p>
            <p className="text-lg text-gray-400">Click To Create User To Start
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-white">Workout Details</h2>
          {workouts.map((workout, index) => (
            <div
              key={index}
              className={`mb-12 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden ${
                mounted ? "animate-fadeIn" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="md:flex">
                <div className="md:w-1/3">
                  <img
                    src={workout.image || "/placeholder.svg"}
                    alt={workout.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 md:w-2/3">
                  <h3 className="text-2xl font-semibold mb-4 text-white">{workout.name}</h3>
                  <ul className="space-y-2">
                    {workout.exercises.map((exercise, exIndex) => (
                      <li key={exIndex} className="text-gray-300">
                        <span className="font-medium">{exercise.name}:</span> {exercise.sets} sets of {exercise.reps}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 shadow-lg mb-12">
          <h2 className="text-3xl font-semibold mb-4 text-white">About B3</h2>
          <p className="text-gray-300 mb-4 leading-relaxed">
            In the dynamic world of personal fitness, ExerciseTracker emerges as a transformative digital companion
            designed to revolutionize how individuals approach their health and wellness journey...
          </p>
          <a
            href="https://github.com/Harshkuamr00/mern-excericse-webapp" // Your GitHub repository URL
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-white transition duration-300 underline"
          >
            Visit our GitHub
            </a>
        </section>
      </main>
    </div>
  );
}
