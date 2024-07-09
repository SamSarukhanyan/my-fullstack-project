import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Header from "./components/Common/header/Header";
import AdminLogin from "./components/Admin/adminLogin/AdminLogin";
import PropertiesList from "./components/Common/propertyList/PropertyList";
import PropertyDetails from "./components/Common/propertyDetails/PropertyDetails";
import AdminProperties from "./components/Admin/AdminProperties/AdminProperties";
import SelectCategory from "./components/Common/selectCategory/SelectCategory";
import AddProperty from "./components/Property/addProperty/AddProperty";
import EditProperty from "./components/Admin/EditProperty/EditProperty";
import NotFound from "./components/Common/notFound/NotFound";
import { AuthProvider } from "./context/AuthContext";
import { FilterProvider } from "./context/FilterContext";
import { PropertyProvider } from "./context/PropertyContext";
import { DimmingProvider } from "./context/DimmingContext";
import HomeLayout from "./components/Common/homeLayout/HomeLayout";
import React, { useRef } from "react";
import CategoryProperties from "./components/Common/categoryProperties/CategoryProperties.jsx";

const queryClient = new QueryClient();

function App() {
  const filterRef = useRef(null);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <FilterProvider>
          <PropertyProvider>
            <DimmingProvider>
              <Header />
              <Routes>
                <Route path="/login" element={<AdminLogin />} />
                <Route path="/" element={<HomeLayout filterRef={filterRef} />}>
                  <Route index element={<PropertiesList />} />
                  <Route path="category/:category" element={<CategoryProperties />} /> 
                </Route>
                <Route path="properties/:id" element={<PropertyDetails />} />
                <Route path="/admin/properties" element={<AdminProperties />} />
                <Route path="/admin/add-property" element={<SelectCategory />} />
                <Route path="/admin/add-property/:category" element={<AddProperty />} />
                <Route path="/admin/edit-property/:id" element={<EditProperty />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DimmingProvider>
          </PropertyProvider>
        </FilterProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
