// import ReactSearchBox from "react-search-box";

export default function SearchBar() {
  return (
    // <ReactSearchBox
    //   placeholder="Search for John, Jane or Mary"
    //   data={[
    //     {
    //       key: "john",
    //       value: "John Doe",
    //     },
    //     {
    //       key: "jane",
    //       value: "Jane Doe",
    //     },
    //     {
    //       key: "mary",
    //       value: "Mary Phillips",
    //     },
    //     {
    //       key: "robert",
    //       value: "Robert",
    //     },
    //     {
    //       key: "karius",
    //       value: "Karius",
    //     },
    //   ]}
    //   onSelect={(record: any) => console.log(record)}
    //   onFocus={() => {
    //     console.log("This function is called when is focussed");
    //   }}
    //   onChange={(value) => console.log(value)}
    //   autoFocus
    //   leftIcon={<>🎨</>}
    //   iconBoxSize="48px"
    // />
    <div
      className="my-auto"
      style={{
        width: "380px",
        height: "32px",
        borderRadius: "20px",
        border: "1px solid gray",
      }}
    ></div>
  );
}
