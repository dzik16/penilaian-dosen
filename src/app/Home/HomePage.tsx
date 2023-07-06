import React, { useState } from 'react';
import { KTSVG } from '../components/KTSVG';

const HomePage: React.FC = () => {
  const [penilaian, setPenilaian] = useState<{ [key: string]: { [key: string]: number } }>({});
  const [alert, setAlert] = useState<boolean>(false)

  const handleChange = (aspek: string, mahasiswa: string, nilai: number) => {
    setPenilaian((prevPenilaian) => ({
      ...prevPenilaian,
      [aspek]: {
        ...(prevPenilaian[aspek] || {}),
        [mahasiswa]: nilai,
      },
    }));
  };

  const handleSubmit = () => {
    console.log(JSON.stringify(penilaian));
    setAlert(true)
    const interval = setInterval(() => {
      setAlert(false)
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  };

  return (
    <div className='m-5 '>
      <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Aplikasi Penilaian Mahasiswa</h1>
      <div className='flex-row card border-0 mb-3'>
        <div className='col-xl-2'>
        </div>
        <div className='col-xl-10 d-flex flex-row' style={{ justifyContent: 'space-between' }}>
          {[...Array(4)].map((_, aspekIndex) => (
            <div key={aspekIndex} className='col-xl-2' style={{ textAlign: 'center' }}>
              <span className='fs-3'>Aspek Penilaian {aspekIndex + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <form>
        {[...Array(10)].map((_, mhsIndex) => (
          <div key={mhsIndex} className='flex-row card mb-2 p-2' style={{ alignItems: 'center' }}>
            <div className='col-xl-2'>
              <div className='d-flex' style={{alignItems:'center'}}>
                <div className='d-flex me-2 rounded-circle bg-light p-2' style={{ width: "35px", height: '35px', justifyContent: 'center', alignItems: 'center' }}>
                  <KTSVG
                    path='/media/ic_user.svg'
                    className='svg-icon-4 rounded-circle'
                  />
                </div>
                <span className='pe-3'>Mahasiswa {mhsIndex + 1}</span>
              </div>
            </div>
            <div className='col-xl-10 d-flex flex-row' style={{ justifyContent: 'space-between' }}>
              {[...Array(4)].map((_, aspekIndex) => (
                <div key={aspekIndex}>
                  <select
                    style={{ width: '200px' }}
                    className='form-control'
                    onChange={(e) => handleChange(`aspek_penilaian_${aspekIndex + 1}`, `mahasiswa_${mhsIndex + 1}`, parseInt(e.target.value))}
                  >
                    {[...Array(11)].map((_, nilaiIndex) => (
                      <option key={nilaiIndex} value={nilaiIndex}>
                        {nilaiIndex}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

          </div>
        ))}
        <div className='d-flex justify-content-end mt-4'>
          <button className='btn btn-dark' type="button" onClick={handleSubmit}>Simpan</button>
        </div>
      </form>
      {
        alert ?
          <div className="alert alert-success mt-5" role="alert">
            <span>{JSON.stringify(penilaian)}</span>
          </div>
          : <></>
      }

    </div>
  );
};

export default HomePage;
