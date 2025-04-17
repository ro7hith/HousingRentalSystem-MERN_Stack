import Input from '../Elements/Input';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import request from '../../utils/request';
import { useEffect, useState } from 'react';
import fdtojson from '../../utils/fdtojson';
import NavBar from '../Elements/Navbar';

function Signup () {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState();

    useEffect(() => {
        const user = localStorage.getItem("user");
        setUser(JSON.parse(user));
    }, []);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const body = fdtojson(e.target);
            const res = user ? await request(`user/`, { method: "PUT", body }) : await request(`user/register`, {
                method: "POST",
                body,
            });
            if (res.data) {
                window.location.href="./login";
            }
            else if (res.error) {
                alert(res.error);
            }
            else {
                alert("unknown error");
            }
        } 
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

    const handleDelete = async () => {
      await request(`user`, { method: 'DELETE' });
      localStorage.removeItem("user");
      window.location.href="./"
    }

  return (
    <>
    <NavBar/>
    <div className="mt-20 mb-6 flex w-100 flex-col h-screen my-auto items-center bgimg bg-cover">
      <form className='w-1/3' onSubmit={handleSubmit}>
            <>
                <Label>
                  Name
                </Label>
                <Input 
                  name="name"
                  defaultValue={user?.name}
                />
            </>

            <>
                <Label>
                  Username
                </Label>
                <Input 
                  name="username"
                  defaultValue={user?.username}
                />
            </>

            <>
                <Label>
                  Password
                </Label>
                <Input 
                  name="password"
                  disabled={user}
                />
            </>

            <>
                <Label>
                  Email
                </Label>
                <Input 
                  name="email"
                  type="email"
                  defaultValue={user?.email}
                />
            </>

        <Button 
          type="submit"
          loading={loading}
        >
          { user? "Update" : "Sign Up" } 
        </Button>
        {
          user &&
          <div className='mt-4'>
          <span
            className='text-s font-medium text-orange-800 cursor-pointer'
            onClick={handleDelete}
            ml={5}
          >
            Delete my profile
          </span>
          </div>
        }
      </form>
    </div>
    </>
  );
}

export default Signup;
