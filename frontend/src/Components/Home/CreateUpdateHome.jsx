import Input from '../Elements/Input';
import Button from '../Elements/Button';
import Label from '../Elements/Label';
import request from '../../utils/request';
import { useState } from 'react';
import fdtojson from '../../utils/fdtojson';
import NavBar from '../Elements/Navbar';

function CreateUpdateHome ({ prefill, onDone }) {
    const [loading, setLoading] = useState(false);
    const handleSubmit = async (e) => {
        try {
            e.preventDefault();

            const body = fdtojson(e.target);
            const res = await request(prefill ? `home/${prefill?._id}` : `home`, {
                method: prefill ? "PUT" : "POST",
                body,
            });
            if (!res.error) {
              alert(prefill ? "Home updated successfully" : "Home added successfully");
              onDone?.(res);
            }
            else if (res.error) {
                alert(res.error);
            }
        } 
        catch (err) {
            console.log(err);
        }
        finally {
            setLoading(false);
        }
    }

  return (
      <>
      <NavBar />
    <div className="mt-20 mb-6 flex w-100 flex-col h-screen my-auto items-center bgimg bg-cover">
      <form className='w-1/3' onSubmit={handleSubmit}>
            <>
                <Label>
                  Description
                </Label>
                <Input 
                  name="description"
                  defaultValue={prefill?.description}
                />
            </>
            <div className='flex gap-2'>
            <span>
                <Label>
                  Year Built
                </Label>
                <Input 
                  name="yearBuilt"
                  type="number"
                  defaultValue={prefill?.yearBuilt}
                />
            </span>

            <span>
                <Label>
                  Bed Count
                </Label>
                <Input 
                  name="bed"
                  type="number"
                  defaultValue={prefill?.bed}
                />
            </span>

            <span>
                <Label>
                  Bath Count
                </Label>
                <Input 
                  name="bath"
                  type="number"
                  defaultValue={prefill?.bath}
                />
            </span>
            </div>

            <>
                <Label>
                  Image URL
                </Label>
                <Input 
                  name="image"
                  defaultValue={prefill?.image}
                />
            </>

            <>
                <Label>
                  Monthly Rent
                </Label>
                <Input 
                  name="rentPerMonth"
                  type="number"
                  defaultValue={prefill?.rentPerMonth}
                />
            </>

        <Button 
          type="submit"
          loading={loading}
          full
        >
           { prefill ? "Done": "Add Home" }
        </Button>
      </form>
    </div>
    </>
  );
}

export default CreateUpdateHome;
