import CategoryView from "../../components/Category/CategoryView";

export default function SareePage() {
    return (
        <CategoryView 
            type="Saree"  // <--- This MUST match the dropdown in Admin
            title="The Saree Collection" 
            subtitle="Timeless Elegance" 
        />
    );
}