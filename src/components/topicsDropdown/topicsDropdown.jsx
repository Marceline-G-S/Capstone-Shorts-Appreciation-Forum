// TopicsDropdown.jsx
import { useEffect, useState } from "react";
import { getAllTopics } from "../../services/topicService.js";

export const TopicsDropdown = ({ onTopicChange }) => {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        getAllTopics().then(topicsData => {
            setTopics(topicsData);
        });
    }, []);

    const handleTopicChange = (event) => {
        const selectedTopicId = event.target.value;
        onTopicChange(selectedTopicId);
    };

    return (
        <div>
            <article className="posts">
                <select onChange={handleTopicChange}>
                    <option key={0} value={0}> {"Select your topic"}</option>
                    {topics.map((eachTopic) => (
                        <option key={eachTopic.id} value={eachTopic.id}> {eachTopic.topicName}</option>
                    ))}
                </select>
            </article>
        </div>
    )
}
