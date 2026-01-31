import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ClipboardList, Download, Search } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import heroBg from "@/assets/hero-bg.jpg";
import { useState } from "react";

const attendanceData = [
  { id: 1, rollNumber: "CS2024001", name: "Arjun Sharma", location: "Library", checkIn: "08:15 AM", checkOut: "12:30 PM", status: "Present" },
  { id: 2, rollNumber: "CS2024002", name: "Priya Patel", location: "Classroom Block 1", checkIn: "08:45 AM", checkOut: "04:00 PM", status: "Present" },
  { id: 3, rollNumber: "CS2024003", name: "Rahul Kumar", location: "MPH", checkIn: "09:00 AM", checkOut: "11:00 AM", status: "Present" },
  { id: 4, rollNumber: "CS2024004", name: "Sneha Reddy", location: "Cafeteria", checkIn: "10:30 AM", checkOut: "01:15 PM", status: "Present" },
  { id: 5, rollNumber: "CS2024005", name: "Vikram Singh", location: "Classroom Block 2", checkIn: "08:00 AM", checkOut: "05:30 PM", status: "Present" },
  { id: 6, rollNumber: "CS2024006", name: "Ananya Gupta", location: "Library", checkIn: "—", checkOut: "—", status: "Absent" },
  { id: 7, rollNumber: "CS2024007", name: "Karthik Nair", location: "Classroom Block 3", checkIn: "09:30 AM", checkOut: "03:45 PM", status: "Present" },
  { id: 8, rollNumber: "CS2024008", name: "Meera Iyer", location: "MPH", checkIn: "07:45 AM", checkOut: "09:00 AM", status: "Present" },
  { id: 9, rollNumber: "CS2024009", name: "Aditya Joshi", location: "Classroom Block 4", checkIn: "08:30 AM", checkOut: "04:30 PM", status: "Present" },
  { id: 10, rollNumber: "CS2024010", name: "Divya Menon", location: "Cafeteria", checkIn: "—", checkOut: "—", status: "Absent" },
  { id: 11, rollNumber: "CS2024011", name: "Rohan Desai", location: "Library", checkIn: "10:00 AM", checkOut: "02:00 PM", status: "Present" },
  { id: 12, rollNumber: "CS2024012", name: "Kavya Krishnan", location: "Classroom Block 5", checkIn: "08:15 AM", checkOut: "05:00 PM", status: "Present" },
];

const AttendancePage = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredData = attendanceData.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const presentCount = attendanceData.filter((s) => s.status === "Present").length;
  const absentCount = attendanceData.filter((s) => s.status === "Absent").length;

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
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-3">
              <ClipboardList className="w-8 h-8 text-primary" />
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                Attendance Sheet
              </h1>
            </div>
          </div>
          <Button variant="glass" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
        >
          <div className="glass rounded-2xl p-6 border border-white/10">
            <p className="text-muted-foreground text-sm mb-1">Total Students</p>
            <h2 className="text-3xl font-bold">{attendanceData.length}</h2>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <p className="text-muted-foreground text-sm mb-1">Present Today</p>
            <h2 className="text-3xl font-bold text-primary">{presentCount}</h2>
          </div>
          <div className="glass rounded-2xl p-6 border border-white/10">
            <p className="text-muted-foreground text-sm mb-1">Absent Today</p>
            <h2 className="text-3xl font-bold text-destructive">{absentCount}</h2>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, roll number, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/5 border-white/10"
            />
          </div>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="glass rounded-3xl border border-white/10 overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-white/10 hover:bg-white/5">
                <TableHead className="text-muted-foreground">Roll Number</TableHead>
                <TableHead className="text-muted-foreground">Name</TableHead>
                <TableHead className="text-muted-foreground">Location</TableHead>
                <TableHead className="text-muted-foreground">Check In</TableHead>
                <TableHead className="text-muted-foreground">Check Out</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((student, index) => (
                <motion.tr
                  key={student.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="border-white/10 hover:bg-white/5"
                >
                  <TableCell className="font-mono text-primary">
                    {student.rollNumber}
                  </TableCell>
                  <TableCell className="font-medium">{student.name}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {student.location}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {student.checkIn}
                  </TableCell>
                  <TableCell className="font-mono text-sm">
                    {student.checkOut}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={student.status === "Present" ? "default" : "destructive"}
                      className={
                        student.status === "Present"
                          ? "bg-primary/20 text-primary border-primary/30"
                          : "bg-destructive/20 text-destructive border-destructive/30"
                      }
                    >
                      {student.status}
                    </Badge>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Date info */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center text-muted-foreground text-sm mt-6"
        >
          Showing attendance for {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </motion.p>
      </div>
    </section>
  );
};

export default AttendancePage;
