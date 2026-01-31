import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Search, Pencil, Trash2, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";

interface Student {
  id: number;
  name: string;
  rollNumber: string;
  department: string;
  year: number;
}

const initialStudents: Student[] = [
  { id: 1, name: "Pranav A", rollNumber: "2025IT1070", department: "IT", year: 1 },
  { id: 2, name: "Modhini V", rollNumber: "2025IT1089", department: "IT", year: 1 },
  { id: 3, name: "Rishe S", rollNumber: "2025IT1030", department: "IT", year: 1 },
  { id: 4, name: "Shivvani T", rollNumber: "2025IT0186", department: "IT", year: 1 },
  { id: 5, name: "Suresh Krishna G", rollNumber: "2025IT0130", department: "IT", year: 1 },
  { id: 6, name: "Srivatsan S", rollNumber: "2025IT1058", department: "IT", year: 1 },
];

const StudentManagement = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    rollNumber: "",
    department: "",
    year: 1,
  });

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({ name: "", rollNumber: "", department: "", year: 1 });
  };

  const handleAddStudent = () => {
    const newStudent: Student = {
      id: Math.max(...students.map((s) => s.id), 0) + 1,
      ...formData,
    };
    setStudents([...students, newStudent]);
    resetForm();
    setIsAddDialogOpen(false);
  };

  const handleEditStudent = () => {
    if (!editingStudent) return;
    setStudents(
      students.map((s) =>
        s.id === editingStudent.id ? { ...s, ...formData } : s
      )
    );
    resetForm();
    setEditingStudent(null);
    setIsEditDialogOpen(false);
  };

  const handleDeleteStudent = (id: number) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      rollNumber: student.rollNumber,
      department: student.department,
      year: student.year,
    });
    setIsEditDialogOpen(true);
  };

  return (
    <section className="min-h-screen relative overflow-hidden pb-24">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="fixed inset-0 bg-gradient-to-b from-background/95 via-background/90 to-background" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Student Management
                </h1>
              </div>
              <p className="text-muted-foreground mt-1 ml-11">
                Add, edit, or remove student recognition data
              </p>
            </div>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="default" className="gap-2" onClick={resetForm}>
                <Plus className="w-4 h-4" />
                Add Student
              </Button>
            </DialogTrigger>
            <DialogContent className="glass border-white/10">
              <DialogHeader>
                <DialogTitle>Add New Student</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="rollNumber">Roll Number</Label>
                  <Input
                    id="rollNumber"
                    value={formData.rollNumber}
                    onChange={(e) =>
                      setFormData({ ...formData, rollNumber: e.target.value })
                    }
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="year">Year</Label>
                  <Input
                    id="year"
                    type="number"
                    min={1}
                    max={4}
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: parseInt(e.target.value) || 1 })
                    }
                    className="bg-white/5 border-white/10"
                  />
                </div>
              </div>
              <Button onClick={handleAddStudent} className="w-full">
                Add Student
              </Button>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Search & Table Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="glass rounded-3xl border border-white/10 p-6"
        >
          {/* Search */}
          <div className="relative max-w-sm mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>

          {/* Table */}
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Roll Number</TableHead>
                <TableHead className="text-muted-foreground">Department</TableHead>
                <TableHead className="text-muted-foreground text-center">Year</TableHead>
                <TableHead className="text-muted-foreground text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.rollNumber}
                  </TableCell>
                  <TableCell className="text-primary font-medium">
                    {student.department}
                  </TableCell>
                  <TableCell className="text-center">{student.year}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditDialog(student)}
                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </AlertDialogTrigger>
                        <AlertDialogContent className="glass border-white/10">
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Student</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {student.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel className="border-white/10">Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeleteStudent(student.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="glass border-white/10">
          <DialogHeader>
            <DialogTitle>Edit Student</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-rollNumber">Roll Number</Label>
              <Input
                id="edit-rollNumber"
                value={formData.rollNumber}
                onChange={(e) =>
                  setFormData({ ...formData, rollNumber: e.target.value })
                }
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-department">Department</Label>
              <Input
                id="edit-department"
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
                className="bg-white/5 border-white/10"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-year">Year</Label>
              <Input
                id="edit-year"
                type="number"
                min={1}
                max={4}
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) || 1 })
                }
                className="bg-white/5 border-white/10"
              />
            </div>
          </div>
          <Button onClick={handleEditStudent} className="w-full">
            Save Changes
          </Button>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default StudentManagement;
