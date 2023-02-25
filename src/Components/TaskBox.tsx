import { ITask } from "../App";

interface ITaskBox {
  data: ITask[];
  onDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void;
  cat: string;
  filterTask: string;
}
const TaskBox = ({ data, onDragStart, cat, filterTask }: ITaskBox) => {
  console.log(data, "data");
  var filterData =
    filterTask == ""
      ? data
      : data.filter((item) =>
          item.name.toLowerCase().includes(filterTask.toLowerCase())
        );

  console.log({ filterData });
  return (
    <div>
      {filterData.length === 0 ? (
        <div className="no-data">Nothing</div>
      ) : (
        filterData.map((t) => {
          return (
            <div
              key={t.name}
              onDragStart={(e) => onDragStart(e, t.name)}
              draggable
              className="task-Box"
              style={{}}
            >
              <span
                className={`task-name ${
                  cat === "Done"
                    ? "completed-task"
                    : cat === "In Progress"
                    ? "process-task"
                    : ""
                }`}
              >
                {t.name}
              </span>
            </div>
          );
        })
      )}
    </div>
  );
};
export default TaskBox;
