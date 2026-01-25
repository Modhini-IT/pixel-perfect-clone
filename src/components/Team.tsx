import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

const teamMembers = [
  { name: "Pranav A", role: "Team Leader", email: "2025it1070@svce.ac.in", phone: "9345149135" },
  { name: "Modhini V", role: "Member", email: "2025it1089@svce.ac.in", phone: "9840859756" },
  { name: "Rishe S", role: "Member", email: "2025it1030@svce.ac.in", phone: "9500405647" },
  { name: "Shivvani T", role: "Member", email: "2025it0186@svce.ac.in", phone: "7305084346" },
  { name: "Suresh Krishna G", role: "Member", email: "2025it0130@svce.ac.in", phone: "7824020581" },
  { name: "Srivatsan S", role: "Member", email: "2025it1058@svce.ac.in", phone: "7358116408" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const Team = () => {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 gradient-cosmic opacity-30" />
      <div className="absolute inset-0 stars opacity-40" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Meet <span className="text-gradient-eco">Team</span> Ethu Nagarjuna Vaa
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            BTech IT • 1st Year • Sri Venkateswara College of Engineering
          </p>
        </motion.div>

        {/* Team Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {teamMembers.map((member, index) => (
            <motion.div key={index} variants={itemVariants} className="group">
              <div className="glass rounded-2xl p-6 h-full transition-all duration-500 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10">
                {/* Avatar Placeholder */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground font-display font-bold text-xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {member.name}
                    </h3>
                    <span className={`text-sm ${member.role === 'Team Leader' ? 'text-primary' : 'text-muted-foreground'}`}>
                      {member.role}
                    </span>
                  </div>
                </div>

                {/* Contact */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="w-4 h-4 text-primary/70" />
                    <span className="truncate">{member.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="w-4 h-4 text-primary/70" />
                    <span>{member.phone}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Team;
