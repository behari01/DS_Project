using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class SimpleUser
    {
        public string DisplayName { get; set; }

        public int Role { get; set; }

        public DateTime FirstJoined { get; set; }

        public string getFullName(int id){
            return DisplayName;
        }

        public int getRole(int id){
            return Role;
        }

        public DateTime getFirstJoined(int id){
            return FirstJoined;
        }
    }
}