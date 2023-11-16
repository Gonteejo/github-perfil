import { useEffect, useState } from 'react';
import styles from './ReposList.module.css';

const ReposList = ({ nomeUsuario }) => {
    const [repos, setRepos] = useState([]);
    const [Carregando, setCarregando] = useState(true);

    useEffect(() => {
        setCarregando(true);
        fetch(`https://api.github.com/users/${nomeUsuario}/repos`)
            .then(res => res.json())
            .then(resJson => {
                setTimeout(() => {
                    setCarregando(false);
                    setRepos(resJson);
                }, 3000);

            }).catch(err => {
                console.log(err);
            })
    }, [nomeUsuario]);

    return (
        <div className='container'>
            {Carregando ? (
                <h1>Carregando...</h1>
            ) : (
            <ul className={styles.list}>
                {/* {repos.map(repositorio => (
                <li key={repositorio.id}>
                    <b>Nome:</b> {repositorio.name}<br/>
                    <b>Linguagem:</b> {repositorio.language}<br/>
                    <a target='_blank' href={repositorio.html_url}>Visitar no github</a><br/><br/>
                </li>
            ))} */}
                {/* Desestruturando o codigo acima */}
                {repos.map(({ id, name, language, html_url }) => (
                    <li className={styles.listItem} key={id}>
                        <div className={styles.ItemName}>
                            <b>Nome:</b>
                            {name}
                        </div>
                        <div className={styles.ItemLanguage}>
                            <b>Linguagem:</b>
                            {language}
                        </div>
                        <a className={styles.Itemlink} target='_blank' href={html_url}>Visitar no github</a>
                    </li>
                ))}             
            </ul>
            )}
        </div>
    )
}

export default ReposList;