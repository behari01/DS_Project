using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Teacher : UserNxenesi
    {
        public string CurrentClass {get; set;}

        public string [] Raports {get; set;}

        public string getCurrentClass(int id){
            return CurrentClass;
        }

        public void createRemark(UserNxenesi nx){

        }

        public void listAllRaports(){
            
        }
    }
}